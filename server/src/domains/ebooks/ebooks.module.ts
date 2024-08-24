import { Module } from '@nestjs/common';
import { EbooksService } from './ebooks.service';
import { EbooksController } from './ebooks.controller';
import { TypeORMError } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ebook } from './entities/ebook.entity';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ebook]), CategoriesModule],
  controllers: [EbooksController],
  providers: [EbooksService],
  exports: [TypeOrmModule],
})
export class EbooksModule {}
