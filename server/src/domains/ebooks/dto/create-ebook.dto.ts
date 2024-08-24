import { Category } from '../../categories/entities/category.entity';

export class CreateEbookDto {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  author: string;
  categories: Category[];
  translator: string;
  like: number;
  view: number;
  content: string;
}
