import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch()
  update(@Request() req: any, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.uid || req.user.id, updateUserDto);
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
  async remove(@Param('id') id: string, @Request() req: any) {
    if (req.user.role) {
      return await this.usersService.remove(id);
    } else {
      throw new HttpException('Permission denied', 403);
    }
  }
}
