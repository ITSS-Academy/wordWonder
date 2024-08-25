import { Injectable } from '@nestjs/common';
import { CreateUserEbookDto } from './dto/create-user_ebook.dto';
import { UpdateUserEbookDto } from './dto/update-user_ebook.dto';

@Injectable()
export class UserEbooksService {
  create(createUserEbookDto: CreateUserEbookDto) {
    return 'This action adds a new userEbook';
  }

  findAll() {
    return `This action returns all userEbooks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userEbook`;
  }

  update(id: number, updateUserEbookDto: UpdateUserEbookDto) {
    return `This action updates a #${id} userEbook`;
  }

  remove(id: number) {
    return `This action removes a #${id} userEbook`;
  }
}
