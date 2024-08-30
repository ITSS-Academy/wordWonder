import { Module } from '@nestjs/common';
import { EbooksService } from './ebooks.service';
import { EbooksController } from './ebooks.controller';
import { TypeORMError } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ebook } from './entities/ebook.entity';
import { CategoriesModule } from '../categories/categories.module';
import { UserEbooksModule } from '../user_ebooks/user_ebooks.module';
import { SearchModule } from '../search/search.module';
import { SectionsModule } from '../sections/sections.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ebook]),
    CategoriesModule,
    UserEbooksModule,
    SearchModule,
    SectionsModule,
  ],
  controllers: [EbooksController],
  providers: [EbooksService],
  exports: [TypeOrmModule],
})
export class EbooksModule {}
