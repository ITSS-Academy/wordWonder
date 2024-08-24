import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
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
    let newEbook = new Ebook();
    newEbook.name = CreateEbookDto.name;
    newEbook.imageUrl = CreateEbookDto.imageUrl;
    newEbook.description = CreateEbookDto.description;
    newEbook.author = CreateEbookDto.author;
    newEbook.translator = CreateEbookDto.translator;
    newEbook.like = CreateEbookDto.like;
    newEbook.view = CreateEbookDto.view;
    newEbook.content = CreateEbookDto.content;
    newEbook.categories = CreateEbookDto.categories;
    await this.ebookRepository.save(newEbook);
    return;
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
      return await this.ebookRepository
        .createQueryBuilder('ebook')
        .leftJoinAndSelect('ebook.categories', 'category')
        .where('ebook.id = :id', { id })
        .getOne();
    } catch {
      throw new HttpException('Ebook not found', 400);
    }
  }

  async update(id: string, UpdateEbookDto: UpdateEbookDto) {
    let updateEbook = await this.ebookRepository.findOneBy({ id: id });
    if (!updateEbook) {
      throw new NotFoundException('Ebook not found');
    }
    updateEbook.name = UpdateEbookDto.name;
    updateEbook.imageUrl = UpdateEbookDto.imageUrl;
    updateEbook.description = UpdateEbookDto.description;
    updateEbook.author = UpdateEbookDto.author;
    await this.ebookRepository.save(updateEbook);
    return;
  }

  async remove(id: string) {
    let deleteEbook = await this.ebookRepository.findOneBy({ id: id });
    if (!deleteEbook) {
      throw new NotFoundException('Ebook not found');
    }
    await this.ebookRepository.remove(deleteEbook);
    return;
  }

  async removeCategoriesFromEbook(
    ebookId: string,
    categoryIds: string[],
  ): Promise<void> {
    const ebook = await this.ebookRepository.findOne({
      where: { id: ebookId },
      relations: ['categories'],
    });

    if (!ebook) {
      throw new NotFoundException('Ebook and Category not found');
    }

    ebook.categories = ebook.categories.filter(
      (category) => !categoryIds.includes(category.id),
    );

    await this.ebookRepository.save(ebook);
  }
}
