import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
} from '@nestjs/common';
import { EbooksService } from './ebooks.service';
import { CreateEbookDto } from './dto/create-ebook.dto';
import { UpdateEbookDto } from './dto/update-ebook.dto';
import { Public } from '../../utils/custom_decorators';

@Controller('ebooks')
export class EbooksController {
  constructor(private readonly ebooksService: EbooksService) {}

  @Public()
  @Post()
  create(@Body() createEbookDto: CreateEbookDto) {
    return this.ebooksService.create(createEbookDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.ebooksService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ebooksService.findOne(id);
  }

  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEbookDto: UpdateEbookDto) {
    return this.ebooksService.update(id, updateEbookDto);
  }

  @Public()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      console.log('id:', id);
      await this.ebooksService.remove(id);
      return { message: 'Ebook successfully removed' };
    } catch (error) {
      if (
        error instanceof SyntaxError &&
        error.message.includes('Unexpected token')
      ) {
        throw new HttpException('Invalid JSON format', 400);
      }
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
