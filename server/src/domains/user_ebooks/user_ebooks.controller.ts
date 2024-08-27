import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserEbooksService } from './user_ebooks.service';
import { CreateUserEbookDto } from './dto/create-user_ebook.dto';
import { UpdateUserEbookDto } from './dto/update-user_ebook.dto';
import { Public } from '../../utils/custom_decorators';
import { User } from '../users/entities/user.entity';

@Controller('user-ebooks')
export class UserEbooksController {
  constructor(private readonly userEbooksService: UserEbooksService) {}

  @Public()
  @Post()
  async create(@Body() createUserEbookDto: CreateUserEbookDto) {
    return await this.userEbooksService.create(createUserEbookDto);
  }

  @Public()
  @Get()
  listUserHistory() {
    return this.userEbooksService.listUserHistory();
  }

  @Public()
  @Get('one')
  async findOneBy(
    @Query('userId') userId: string,
    @Query('ebookId') ebookId: string,
  ) {
    return await this.userEbooksService.findOneByEbookIdAndUserId(
      ebookId,
      userId,
    );
  }

  @Public()
  @Patch('')
  update(
    @Query('userId') userId: string,
    @Query('ebookId') ebookId: string,
    @Body() updateUserEbookDto: UpdateUserEbookDto,
  ) {
    return this.userEbooksService.update(userId, ebookId, updateUserEbookDto);
  }

  @Public()
  @Delete(':user')
  remove(@Param('user') user: User) {
    return this.userEbooksService.remove(user);
  }
}
