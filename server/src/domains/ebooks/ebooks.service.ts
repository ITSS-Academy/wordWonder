import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEbookDto } from './dto/create-ebook.dto';
import { UpdateEbookDto } from './dto/update-ebook.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ebook } from './entities/ebook.entity';

@Injectable()
export class EbooksService {
  constructor(
    @InjectRepository(Ebook)
    private readonly ebookRepository: Repository<Ebook>,
  ) {}

  async create(CreateEbookDto: CreateEbookDto) {
    let newEbook = new Ebook();
    newEbook.name = CreateEbookDto.name;
    newEbook.imageUrl = CreateEbookDto.imageUrl;
    newEbook.description = CreateEbookDto.description;
    newEbook.author = CreateEbookDto.author;
    newEbook.category = CreateEbookDto.category;
    newEbook.translator = CreateEbookDto.translator;
    newEbook.dateCreated = CreateEbookDto.dateCreated;
    newEbook.like = CreateEbookDto.like;
    newEbook.view = CreateEbookDto.view;
    newEbook.content = CreateEbookDto.content;
    await this.ebookRepository.save(newEbook);
    return;
  }

  async findAll() {
    return await this.ebookRepository.find();
  }

  async findOne(id: string) {
    await this.ebookRepository.findOneBy({ id: id });
    return;
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
    updateEbook.category = UpdateEbookDto.category;
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
}
