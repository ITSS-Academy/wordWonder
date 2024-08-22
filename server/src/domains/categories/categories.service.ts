import { HttpException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
      @InjectRepository(Category)
      private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(category: CreateCategoryDto) {
    let newCategory = this.categoryRepository.create(category);
    return await this.categoryRepository.save(newCategory);
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: string) {
    return await this.categoryRepository.findOneBy({ id: id });
  }

  async update(id: string, Category: UpdateCategoryDto) {
    let updatedCategory = await this.categoryRepository.findOneBy({ id: id });
    updatedCategory.name = Category.name;
    await this.categoryRepository.save(updatedCategory);
    return;
  }

  async remove(id: string) {
    let deleteCategory = await this.categoryRepository.findOneBy({ id: id });
    if (!deleteCategory) {
      throw new HttpException('Category not found', 404);
    }
    await this.categoryRepository.remove(deleteCategory);
    return;
  }

  async findByName(name: string): Promise<Category> {
    return await this.categoryRepository.findOneBy({ name: name });
  }
}
