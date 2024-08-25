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
import { EbooksService } from './ebooks.service';
import { CreateEbookDto } from './dto/create-ebook.dto';
import { UpdateEbookDto } from './dto/update-ebook.dto';
import { Public } from '../../utils/custom_decorators';

@Controller('ebooks')
export class EbooksController {
  constructor(private readonly ebooksService: EbooksService) {}

  @Public()
  @Post()
  async create(@Body() createEbookDto: CreateEbookDto) {
    return await this.ebooksService.create(createEbookDto);
  }

  @Public()
  @Get()
  async findAll() {
    return await this.ebooksService.findAll();
  }

  @Public()
  @Get('one/:id')
  async findOne(@Param('id') id: string) {
    return await this.ebooksService.findOne(id);
  }

  @Public()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEbookDto: UpdateEbookDto,
  ) {
    return await this.ebooksService.update(id, updateEbookDto);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ebooksService.remove(id);
  }

  @Public()
  @Get('trend')
  async findListByTrend(@Query('limit') limit: string) {
    console.log('limit', limit);
    return await this.ebooksService.listByTrend(+limit);
  }

  @Public()
  @Get('rating')
  async findListByRating(@Query('limit') limit: string) {
    return await this.ebooksService.listByRating(+limit);
  }

  @Public()
  @Get('recommend')
  async findListByRecommend(@Query('limit') limit: string) {
    return await this.ebooksService.listByRecommend(+limit);
  }

  @Public()
  @Patch('view/:id')
  async updateView(@Param('id') id: string) {
    return await this.ebooksService.updateView(id);
  }

  @Public()
  @Patch('like/:id')
  async updateLike(@Param('id') id: string) {
    return await this.ebooksService.updateLike(id);
  }

  // @Public()
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   console.log('id', id);
  //   return this.ebooksService.remove(id);
  // }
}
