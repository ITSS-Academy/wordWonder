import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
  HttpException,
} from '@nestjs/common';
import { EbooksService } from './ebooks.service';
import { CreateEbookDto } from './dto/create-ebook.dto';
import { UpdateEbookDto } from './dto/update-ebook.dto';
import { Public } from '../../utils/custom_decorators';

@Controller('ebooks')
export class EbooksController {
  constructor(private readonly ebooksService: EbooksService) {}

  @Post()
  async create(@Body() createEbookDto: CreateEbookDto, @Request() req: any) {
    if (!req.user.role) {
      throw new HttpException('Permission denied', 403);
    }
    return await this.ebooksService.create(createEbookDto);
  }

  @Get()
  async findAll(@Request() req: any) {
    if (!req.user.role) {
      throw new HttpException('Permission denied', 403);
    }
    return await this.ebooksService.findAll();
  }

  @Get('one/:id')
  async findOne(
    @Param('id') id: string,
    @Query('lastSection') lastSection: number,
  ) {
    return await this.ebooksService.findOne(id, lastSection);
  }

  @Patch('one/:id')
  async update(
    @Param('id') id: string,
    @Body() updateEbookDto: UpdateEbookDto,
    @Request() req: any,
  ) {
    if (!req.user.role) {
      throw new HttpException('Permission denied', 403);
    }
    return await this.ebooksService.update(id, updateEbookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    if (!req.user.role) {
      throw new HttpException('Permission denied', 403);
    }
    return this.ebooksService.remove(id);
  }

  @Get('trend')
  async findListByTrend(@Query('limit') limit: string) {
    return await this.ebooksService.listByTrend(+limit);
  }

  @Get('rating')
  async findListByRating(@Query('limit') limit: string) {
    return await this.ebooksService.listByRating(+limit);
  }

  @Get('recommend')
  async findListByRecommend(@Query('limit') limit: string) {
    return await this.ebooksService.listByRecommend(+limit);
  }

  @Patch('view/:id')
  async updateView(@Param('id') id: string) {
    return await this.ebooksService.updateView(id);
  }

  @Patch('like/:id')
  async increaseLike(@Param('id') ebookId: string, @Request() req: any) {
    return await this.ebooksService.increaseLike(
      ebookId,
      req.user.id || req.user.uid,
    );
  }

  @Patch('dislike/:id')
  async decreaseLike(@Param('id') ebookId: string, @Request() req: any) {
    return await this.ebooksService.decreaseLike(
      ebookId,
      req.user.id || req.user.uid,
    );
  }

  // @Public()
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   console.log('id', id);
  //   return this.ebooksService.remove(id);
  // }
}
