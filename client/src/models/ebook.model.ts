export interface EBookModel {
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

//vietnamse
export const GENRES: string[] = [
  'Hành động',
  'Viễn tưởng',
  'Bí ẩn',
  'Khoa học',
  'Phép thuật',
  'Tâm lý',
  'Kinh dị',
  'Hài hước',
  'Tình cảm',
  'Thể thao',
  'Lịch sử',
  'Học đường',
  'Cổ tích',
  'Phiêu lưu',
  'Thần thoại',
  'Trinh thám',
  'Thiếu nhi',
  'Ngôn tình',
  'Truyện tranh',
  'Light Novel',
  'Tiểu thuyết',
];
