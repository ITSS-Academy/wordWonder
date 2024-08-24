export class CreateEbookDto {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  author: string;
  category: string[];
  translator: string;
  dateCreated: string;
  like: number;
  view: number;
  content: string;
}
