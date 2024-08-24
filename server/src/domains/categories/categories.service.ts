import { HttpException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import {isNumber} from "class-validator";

@Injectable()
export class CategoriesService {
  constructor(
      @InjectRepository(Category)
      private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(category: CreateCategoryDto) {
    let newCategory = this.categoryRepository.create(category);
    if ( await this.categoryRepository.findOneBy({ name: category.name })) {
      throw new HttpException('Category already had', 400);
    }
    if( /\d/.test(category.name)){
      throw new HttpException('Category name is not a number ', 400);
    }
     await this.categoryRepository.save(newCategory);
        return;
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: string) {
    try {
      let category = await this.categoryRepository.findOneBy({ id: id });
      if (!category) {
        throw new HttpException('Category not found', 400);
      }
        return category;
    }catch (e){
        throw new HttpException('Category not found', 400);
    }
  }

  async update(id: string, Category: UpdateCategoryDto) {
    try {
        let updatedCategory = await this.categoryRepository.findOneBy({ id: id });
        updatedCategory.name = Category.name;
        await this.categoryRepository.save(updatedCategory);
        return;
    }
    catch (e){
        throw new HttpException('Category not found', 400);
    }
  }

  async remove(id: string) {
    let deleteCategory = await this.categoryRepository.findOneBy({ id: id });
    if (!deleteCategory) {
      throw new HttpException('Category not found', 400);
    }
    await this.categoryRepository.remove(deleteCategory);
    return;
  }

  async findByName(name: string): Promise<Category> {
    return await this.categoryRepository.findOneBy({ name: name });
  }
}
