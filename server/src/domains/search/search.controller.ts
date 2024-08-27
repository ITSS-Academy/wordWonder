import { Body, Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('ebooks')
  async searchEbooks(@Body() request: any) {
    return this.searchService.searchEbooks(request.query);
  }

  @Get('any')
  async searchTags(@Query('q') q: string) {
    let ebooks = await this.searchService.searchAny('wordwonder_ebooks', q);
    return {
      ebooks: ebooks,
    };
  }
}
