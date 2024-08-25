import { Module } from '@nestjs/common';
import { UserEbooksService } from './user_ebooks.service';
import { UserEbooksController } from './user_ebooks.controller';

@Module({
  controllers: [UserEbooksController],
  providers: [UserEbooksService],
})
export class UserEbooksModule {}
