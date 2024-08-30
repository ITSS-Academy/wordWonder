import { User } from '../../users/entities/user.entity';
import { Ebook } from '../../ebooks/entities/ebook.entity';

export class CreateUserEbookDto {
  user: User;
  ebook: Ebook;
  readingStatus: string;
  lastSection: number;
}
