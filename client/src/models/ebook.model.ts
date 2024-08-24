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
  'Khoa học viễn tưởng',
  'Giả tưởng',
  'Bí ẩn',
  'Lịch sử hư cấu',
  'Kinh dị',
  'Giật gân',
  'Lãng mạn',
  'Miền Tây',
  'Chống không tưởng',
  'Hồi ký',
  'Tiểu sử',
  'Tự lực',
  'Sách nấu ăn',
  'Lịch sử',
  'Du lịch',
  'Tội phạm thực sự',
  'Hài hước',
  'Thiếu nhi',
  'Thanh thiếu niên',
  'Thơ ca',
  'Khoa học',
  'Thiên nhiên',
  'Toán học',
  'Triết học',
  'Tôn giáo',
  'Tâm linh',
  'Thời đại mới',
  'Nghệ thuật',
  'Nhiếp ảnh',
  'Kiến trúc',
  'Âm nhạc',
  'Phim ảnh',
  'Thời trang',
  'Nghệ thuật biểu diễn',
  'Tiểu thuyết đồ họa',
  'Manga',
];
