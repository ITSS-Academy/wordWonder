import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch()
  update(@Request() req: any, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.uid, updateUserDto);
  }

  @Post()
  async create(@Request() req: any) {
    console.log(req.user);
    return await this.usersService.create(req.user);
  }

  // @Get()
  // async findAll() {
  //   return await this.usersService.findAll();
  // }

  @Get()
  async findOne(@Request() req: any) {
    console.log(req.user.uid);
    return await this.usersService.findOne(req.user.uid || req.user.id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
