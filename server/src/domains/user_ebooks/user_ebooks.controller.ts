import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserEbooksService } from './user_ebooks.service';
import { CreateUserEbookDto } from './dto/create-user_ebook.dto';
import { UpdateUserEbookDto } from './dto/update-user_ebook.dto';

@Controller('user-ebooks')
export class UserEbooksController {
  constructor(private readonly userEbooksService: UserEbooksService) {}

  @Post()
  create(@Body() createUserEbookDto: CreateUserEbookDto) {
    return this.userEbooksService.create(createUserEbookDto);
  }

  @Get()
  findAll() {
    return this.userEbooksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userEbooksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserEbookDto: UpdateUserEbookDto) {
    return this.userEbooksService.update(+id, updateUserEbookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userEbooksService.remove(+id);
  }
}
