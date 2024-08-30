import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEbookDto } from './dto/create-ebook.dto';
import { UpdateEbookDto } from './dto/update-ebook.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Ebook } from './entities/ebook.entity';
import { Category } from '../categories/entities/category.entity';
import { UserEbook } from '../user_ebooks/entities/user_ebook.entity';
import { User } from '../users/entities/user.entity';
import { SearchService } from '../search/search.service';
import { Section } from '../sections/entities/section.entity';

@Injectable()
export class EbooksService {
  constructor(
    @InjectRepository(Ebook)
    private readonly ebookRepository: Repository<Ebook>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(UserEbook)
    private readonly userEbookRepository: Repository<UserEbook>,
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
    private readonly searchService: SearchService,
  ) {}

  async create(createEbookDto: CreateEbookDto) {
    try {
      let newEbook = new Ebook();
      newEbook.id = createEbookDto.id;
      newEbook.name = createEbookDto.name;
      newEbook.imageUrl = createEbookDto.imageUrl;
      newEbook.description = createEbookDto.description;
      newEbook.author = createEbookDto.author;
      newEbook.translator = createEbookDto.translator;
      newEbook.categories = await this.categoryRepository.findBy({
        id: In(createEbookDto.categories.map((category) => category.id)),
      });
      await this.ebookRepository.save(newEbook);
      let chunkSize = 2048;
      let currentPos = 0;
      while (
        currentPos <=
        Math.min(createEbookDto.content.length, currentPos + chunkSize)
      ) {
        let section = new Section();
        let endPos = Math.min(
          createEbookDto.content.length,
          currentPos + chunkSize,
        );
        section.data = createEbookDto.content.slice(currentPos, endPos);
        section.ebook = newEbook;
        await this.sectionRepository.save(section);
        currentPos += chunkSize;
      }
      await this.searchService.indexEbook(newEbook);
      return;
    } catch (e) {
      throw new HttpException(e, 400);
    }
  }

  async findAll() {
    try {
      return await this.ebookRepository.find({
        relations: {
          categories: true,
        },
      });
    } catch (e) {
      throw new HttpException(e, 400);
    }
  }

  async findOne(id: string, lastSection: number, isNext: boolean) {
    try {
      let result = await this.ebookRepository
        .createQueryBuilder('ebook')
        .leftJoinAndSelect('ebook.categories', 'category')
        .where('ebook.id = :id', { id })
        .getOne();

      if (!result) {
        throw new HttpException('Ebook not found', HttpStatus.NOT_FOUND);
      }

      let sections = [];
      //get the next to sections of the book
      if (isNext) {
        sections = await this.sectionRepository
          .createQueryBuilder('section')
          .where('section.ebookId = :id', { id })
          .andWhere('section.id > :lastSection', { lastSection })
          .orderBy('section.id', 'ASC')
          .take(10)
          .getMany();
      } else {
        sections = await this.sectionRepository
          .createQueryBuilder('section')
          .where('section.ebookId = :id', { id })
          .andWhere('section.id < :lastSection', { lastSection })
          .orderBy('section.id', 'DESC')
          .take(10)
          .getMany();
      }

      return {
        ebook: result,
        sections: sections,
      };
    } catch (e) {
      throw new HttpException(e, 400);
    }
  }

  async update(
    id: string,
    updateEbookDto: UpdateEbookDto,
    isUpdateContent: boolean,
  ) {
    let updateEbook = new Ebook();
    try {
      updateEbook = await this.ebookRepository.findOneBy({ id: id });
      if (!updateEbook) {
        throw new NotFoundException('Ebook not found');
      }
      //fetch categories from the database
      const categories = await this.categoryRepository.findBy({
        id: In(updateEbookDto.categories.map((category) => category.id)),
      });
      updateEbook.name = updateEbookDto.name;
      updateEbook.imageUrl = updateEbookDto.imageUrl;
      updateEbook.description = updateEbookDto.description;
      updateEbook.author = updateEbookDto.author;
      updateEbook.translator = updateEbookDto.translator;
      updateEbook.categories = categories;

      console.log('-------------------------------', isUpdateContent);
      if (isUpdateContent) {
        if (updateEbookDto.content != '') {
          // delete all sections
          await this.sectionRepository
            .createQueryBuilder('section')
            .delete()
            .where('ebookId = :id', { id })
            .execute();

          let chunkSize = 2048;
          let currentPos = 0;
          while (
            currentPos <=
            Math.min(updateEbookDto.content.length, currentPos + chunkSize)
          ) {
            let section = new Section();
            let endPos = Math.min(
              updateEbookDto.content.length,
              currentPos + chunkSize,
            );
            section.data = updateEbookDto.content.slice(currentPos, endPos);
            section.ebook = updateEbook;
            await this.sectionRepository.save(section);
            currentPos += chunkSize;
          }
        }
      }

      await this.ebookRepository.save(updateEbook);
    } catch (e) {
      throw new HttpException(e, 400);
    }
    await this.searchService.updateEbook(updateEbook);
    return;
  }

  async remove(id: string) {
    try {
      const deleteResult = await this.ebookRepository
        .createQueryBuilder('ebook')
        .delete()
        .where('id = :id', { id })
        .execute();
      if (deleteResult.affected === 0) {
        throw new HttpException('Ebook not found', HttpStatus.NOT_FOUND);
      }
      await this.searchService.deleteEbook(id);
      return;
    } catch (e) {
      throw new HttpException(e, 400);
    }
  }

  async listByTrend(limit: number) {
    try {
      return await this.ebookRepository
        .createQueryBuilder('ebook')
        .leftJoinAndSelect('ebook.categories', 'categories')
        .select(['ebook', 'categories'])
        .orderBy('ebook.view', 'DESC')
        .take(limit)
        .getMany();
    } catch (e) {
      throw new HttpException(e, 400);
    }
  }

  async listByRating(limit: number) {
    try {
      return await this.ebookRepository
        .createQueryBuilder('ebook')
        .leftJoinAndSelect('ebook.categories', 'categories')
        .select(['ebook', 'categories'])
        .orderBy('ebook.like', 'DESC')
        .take(limit)
        .getMany();
    } catch (e) {
      throw new HttpException(e, 400);
    }
  }

  async listByRecommend(limit: number) {
    try {
      return await this.ebookRepository
        .createQueryBuilder('ebook')
        .leftJoinAndSelect('ebook.categories', 'categories')
        .select(['ebook', 'categories'])
        .orderBy('RANDOM()')
        .limit(limit)
        .getMany();
    } catch (e) {
      throw new HttpException(e, 400);
    }
  }

  async updateView(id: string) {
    try {
      const ebook = await this.ebookRepository.findOneBy({ id: id });
      if (!ebook) {
        throw new HttpException('Ebook not found', 400);
      }
      ebook.view += 1;
      await this.ebookRepository.save(ebook);
    } catch (e) {
      throw new HttpException(e, 400);
    }
  }

  async increaseLike(ebookId: string, userId: string) {
    try {
      //find the ebook
      const ebook = await this.ebookRepository.findOneBy({ id: ebookId });
      if (!ebook) {
        throw new HttpException('Ebook not found', 400);
      }

      //find the user-ebook
      let userEbook = await this.userEbookRepository.findOneBy({
        user: userId as any,
        ebook: ebookId as any,
      });

      //condition when have or not have the user-ebook yet
      if (userEbook) {
        //check that the user already liked the ebook
        if (userEbook.isLiked) {
          throw new HttpException('User already liked this ebook', 400);
        }
        //update the user-ebook
        userEbook.isLiked = true;
        await this.userEbookRepository
          .createQueryBuilder()
          .update(UserEbook)
          .set(userEbook)
          .where('userId = :userId AND ebookId = :ebookId', { userId, ebookId })
          .execute();
      } else {
        //create new
        const newUserEbook = new UserEbook();
        newUserEbook.ebook = ebookId as any;
        newUserEbook.user = userId as any;
        newUserEbook.isLiked = true;
        newUserEbook.purchaseDate = Date.now().toString();
        await this.userEbookRepository.save(newUserEbook);
      }
      ebook.like += 1;
      await this.ebookRepository.save(ebook);
      return;
    } catch (e) {
      throw new HttpException(e, 400);
    }
  }

  async decreaseLike(ebookId: string, userId: string) {
    try {
      //find the ebook
      const ebook = await this.ebookRepository.findOneBy({ id: ebookId });
      if (!ebook) {
        throw new HttpException('Ebook not found', 400);
      }

      //find the user-ebook
      let userEbook = await this.userEbookRepository.findOneBy({
        user: userId as any,
        ebook: ebookId as any,
      });

      //condition when have or not have the user-ebook yet
      if (userEbook) {
        //check that the user already unliked the ebook
        if (!userEbook.isLiked) {
          throw new HttpException('User already dont liked this ebook', 400);
        }
        //update the user-ebook
        userEbook.isLiked = false;
        await this.userEbookRepository
          .createQueryBuilder()
          .update(UserEbook)
          .set(userEbook)
          .where('userId = :userId AND ebookId = :ebookId', { userId, ebookId })
          .execute();
      } else {
        throw new HttpException('User ebook not found', 400);
      }
      ebook.like -= 1;
      await this.ebookRepository.save(ebook);
      return;
    } catch (e) {
      throw new HttpException(e, 400);
    }
  }
}
