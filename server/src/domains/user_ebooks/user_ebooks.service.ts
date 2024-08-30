import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserEbookDto } from './dto/create-user_ebook.dto';
import { UpdateUserEbookDto } from './dto/update-user_ebook.dto';
import { ReadingStatus, UserEbook } from './entities/user_ebook.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';

@Injectable()
export class UserEbooksService {
  constructor(
    @InjectRepository(UserEbook)
    private readonly userEbookRepository: Repository<UserEbook>,
  ) {}

  async validate(userEbook: UserEbook) {
    // Validate the DTO
    const validationErrors = await validate(userEbook);
    if (validationErrors.length > 0) {
      // Handle validation errors, e.g., throw an exception or return an error response
      throw new HttpException(
        {
          message:
            '[' +
            validationErrors
              .map((error) => Object.values(error.constraints).join(', '))
              .join(', ') +
            ']',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create(userId: string, createUserEbookDto: CreateUserEbookDto) {
    try {
      let newUserEbook = this.userEbookRepository.create(createUserEbookDto);
      newUserEbook.user = userId as any;
      newUserEbook.ebook = createUserEbookDto.ebook;
      newUserEbook.readingStatus = createUserEbookDto.readingStatus;
      newUserEbook.purchaseDate = Date.now().toString();
      await this.userEbookRepository.save(newUserEbook);
      return;
    } catch (e) {
      throw new HttpException(e, 400);
    }
  }

  async listUserHistory(userId: string) {
    try {
      return await this.userEbookRepository
        .createQueryBuilder('userEbook')
        .leftJoinAndSelect('userEbook.ebook', 'ebook')
        .leftJoinAndSelect('ebook.categories', 'categories')
        .select([
          'userEbook.readingStatus',
          'userEbook.purchaseDate',
          'userEbook.isLiked',
          'ebook.id',
          'ebook.name',
          'ebook.imageUrl',
          'ebook.author',
          'categories.id',
          'categories.name',
        ])
        .where('userEbook.userId = :userId', { userId })
        .getMany();
    } catch (e) {
      throw new HttpException(e, 400);
    }
  }

  async findOneByEbookIdAndUserId(ebookId: string, userId: string) {
    try {
      let result = await this.userEbookRepository
        .createQueryBuilder('userEbook')
        .leftJoinAndSelect('userEbook.ebook', 'ebook')
        .leftJoinAndSelect('userEbook.user', 'user')
        .select([
          'userEbook',
          'ebook.id',
          'ebook.name',
          'user.id',
          'user.nickName',
          'user.photoURL',
        ])
        .where('userEbook.userId = :userId', { userId })
        .andWhere('userEbook.ebookId = :ebookId', { ebookId })
        .getOne();
      if (!result) {
        throw new HttpException('UserEbook not found', HttpStatus.NOT_FOUND);
      }
      return result;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    userId: string,
    ebookId: string,
    updateUserEbookDto: UpdateUserEbookDto,
  ) {
    try {
      await this.userEbookRepository
        .createQueryBuilder()
        .update(UserEbook)
        .set(updateUserEbookDto)
        .where('userId = :userId AND ebookId = :ebookId', { userId, ebookId })
        .execute();
      return;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(userId: string, ebookId: string) {
    try {
      await this.userEbookRepository
        .createQueryBuilder()
        .delete()
        .from(UserEbook)
        .where('userEbook.userId = :userId', { userId })
        .andWhere('userEbook.ebookId = :ebookId', { ebookId })
        .execute();
      return;
    } catch {
      throw new HttpException('Delete fail', 400);
    }
  }

  async read(
    ebookId: string,
    userId: string,
    updateUserEbookDto: UpdateUserEbookDto,
  ) {
    try {
      // Step 1: Find the UserEbook
      let userEbook = await this.findOneByEbookIdAndUserId(ebookId, userId);

      // Step 2: Update the UserEbook
      userEbook.lastSection = updateUserEbookDto.lastSection;
      userEbook.lastReadDate = new Date().toISOString();
      userEbook.readingStatus = ReadingStatus.READING;

      // Step 3: Validate the updated UserEbook
      await this.validate(userEbook);

      // Step 4: Save the updated UserEbook
      return await this.update(ebookId, userId, userEbook);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
