import { Module } from '@nestjs/common';
import { EbooksService } from './ebooks.service';
import { EbooksController } from './ebooks.controller';
import { TypeORMError } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ebook } from './entities/ebook.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ebook])],
  controllers: [EbooksController],
  providers: [EbooksService],
  exports: [TypeOrmModule],
})
export class EbooksModule {}
