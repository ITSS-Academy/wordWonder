import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEbookDto } from './dto/create-ebook.dto';
import { UpdateEbookDto } from './dto/update-ebook.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ebook } from './entities/ebook.entity';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class EbooksService {
  constructor(
    @InjectRepository(Ebook)
    private readonly ebookRepository: Repository<Ebook>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(CreateEbookDto: CreateEbookDto) {
    try {
      let newEbook = new Ebook();
      newEbook.name = CreateEbookDto.name;
      newEbook.imageUrl = CreateEbookDto.imageUrl;
      newEbook.description = CreateEbookDto.description;
      newEbook.author = CreateEbookDto.author;
      newEbook.translator = CreateEbookDto.translator;
      newEbook.like = 0;
      newEbook.view = 0;
      newEbook.content = CreateEbookDto.content;
      newEbook.categories = CreateEbookDto.categories;
      await this.ebookRepository.save(newEbook);
      return;
    } catch (e) {
      throw new HttpException(e, 400);
    }
  }

  async findAll() {
    return await this.ebookRepository.find({
      relations: {
        categories: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      let result = await this.ebookRepository
        .createQueryBuilder('ebook')
        .leftJoinAndSelect('ebook.categories', 'category')
        .where('ebook.id = :id', { id })
        .getOne();
      if (!result) {
        throw new HttpException('Ebook not found', HttpStatus.NOT_FOUND);
      }
      return result;
    } catch {
      throw new HttpException('Ebook not found', 400);
    }
  }

  async update(id: string, UpdateEbookDto: UpdateEbookDto) {
    try {
      let updateEbook = await this.ebookRepository.findOneBy({ id: id });
      if (!updateEbook) {
        throw new NotFoundException('Ebook not found');
      }
      updateEbook.name = UpdateEbookDto.name;
      updateEbook.imageUrl = UpdateEbookDto.imageUrl;
      updateEbook.description = UpdateEbookDto.description;
      updateEbook.author = UpdateEbookDto.author;
      updateEbook.translator = UpdateEbookDto.translator;
      updateEbook.content = UpdateEbookDto.content;
      updateEbook.categories = UpdateEbookDto.categories;
      await this.ebookRepository.save(updateEbook);
      return;
    } catch (e) {
      throw new HttpException(e, 400);
    }
  }

  async remove(id: string) {
    try {
      const deleteResult = await this.ebookRepository
        .createQueryBuilder('ebook')
        .delete()
        .where('id = :id', { id })
        .execute();
    } catch {
      throw new HttpException('Ebook not found', 400);
    }
  }

  async listByTrend(limit: number) {
    try {
      return await this.ebookRepository
        .createQueryBuilder('ebook')
        .leftJoinAndSelect('ebook.categories', 'categories')
        .select(['ebook', 'categories'])
        .orderBy('ebook.view', 'DESC')
        .limit(limit)
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
        .limit(limit)
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

  async increaseLike(id: string) {
    try {
      const ebook = await this.ebookRepository.findOneBy({ id: id });
      if (!ebook) {
        throw new HttpException('Ebook not found', 400);
      }
      ebook.like += 1;
      await this.ebookRepository.save(ebook);
    } catch (e) {
      throw new HttpException('like fail', 400);
    }
  }

  async decreaseLike(id: string) {
    try {
      const ebook = await this.ebookRepository.findOneBy({ id: id });
      if (!ebook) {
        throw new HttpException('Ebook not found', 400);
      }
      ebook.like -= 1;
      await this.ebookRepository.save(ebook);
    } catch (e) {
      throw new HttpException('like fail', 400);
    }
  }

  //xoa het body di
  //cai api nay k can body chi can param la id cua cuon sach de em tang luot like luot view len thoi
  //sua ten no lai la updateView updateLike
  //de do di a sua lai cai api tren do cho em
  //okki anh
  //day code moi len em oi
  //nong lam
  //yes
  //tesst lai di em

  // async remove(id: string) {
  //   let deleteEbook = await this.ebookRepository.findOneBy({ id: id });
  //   if (!deleteEbook) {
  //     throw new NotFoundException('Ebook not found');
  //   }
  //   await this.ebookRepository.remove(deleteEbook);
  //   return;
  // }

  // async removeCategoriesFromEbook(
  //   ebookId: string,
  //   categoryIds: string[],
  // ): Promise<void> {
  //   const ebook = await this.ebookRepository.findOne({
  //     where: { id: ebookId },
  //     relations: ['categories'],
  //   });
  //
  //   if (!ebook) {
  //     throw new NotFoundException('Ebook and Category not found');
  //   }
  //
  //   ebook.categories = ebook.categories.filter(
  //     (category) => !categoryIds.includes(category.id),
  //   );
  //
  //   await this.ebookRepository.save(ebook);
  // }
}
