import { Category } from '../../categories/entities/category.entity';
import { Section } from '../../sections/entities/section.entity';

export class CreateEbookDto {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  author: string;
  categories: Category[];
  translator: string;
  content: string;
}
