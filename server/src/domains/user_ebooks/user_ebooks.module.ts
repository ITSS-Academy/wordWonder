import { Module } from '@nestjs/common';
import { UserEbooksService } from './user_ebooks.service';
import { UserEbooksController } from './user_ebooks.controller';
import { UserEbook } from './entities/user_ebook.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEbook])],
  controllers: [UserEbooksController],
  providers: [UserEbooksService],
  exports: [TypeOrmModule],
})
export class UserEbooksModule {}
