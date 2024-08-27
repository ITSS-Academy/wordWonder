import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
  Request,
  HttpException,
} from '@nestjs/common';
import { UserEbooksService } from './user_ebooks.service';
import { CreateUserEbookDto } from './dto/create-user_ebook.dto';
import { UpdateUserEbookDto } from './dto/update-user_ebook.dto';
import { Public } from '../../utils/custom_decorators';
import { User } from '../users/entities/user.entity';

@Controller('user-ebooks')
export class UserEbooksController {
  constructor(private readonly userEbooksService: UserEbooksService) {}

  @Post()
  async create(
    @Request() req: any,
    @Body() createUserEbookDto: CreateUserEbookDto,
  ) {
    return await this.userEbooksService.create(
      req.user.id || req.user.uid,
      createUserEbookDto,
    );
  }

  @Get()
  listUserHistory(@Request() req: any) {
    return this.userEbooksService.listUserHistory(req.user.id || req.user.uid);
  }

  @Get('one')
  async findOneBy(@Request() req: any, @Query('ebookId') ebookId: string) {
    return await this.userEbooksService.findOneByEbookIdAndUserId(
      ebookId,
      req.user.id || req.user.uid,
    );
  }

  // @Patch('')
  // update(
  //   @Request() req: any,
  //   @Query('ebookId') ebookId: string,
  //   @Body() updateUserEbookDto: UpdateUserEbookDto,
  // ) {
  //   return this.userEbooksService.update(
  //     req.user.id || req.user.uid,
  //     ebookId,
  //     updateUserEbookDto,
  //   );
  // }

  @Public()
  @Delete('')
  remove(
    @Query('ebookId') ebookId: string,
    @Query('userId') userId: string,
    @Request() req: any,
  ) {
    if (!req.user.role) {
      throw new HttpException('Permission denied', 403);
    }
    return this.userEbooksService.remove(userId, ebookId);
  }
}
