import { Injectable } from '@angular/core';
import { EBookModel } from '../models/ebook.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class EbookService {
  getEbooks(): EBookModel[] {
    return this.ebooks;
  }

  constructor(private authService: AuthService) {}

  getEbooksByCategory(category: string[]): EBookModel[] {
    return this.ebooks.filter((ebook) => ebook.category === category);
  }

  private ebooks: EBookModel[] = [
    {
      id: '1',
      name: 'Harry Potter và Chiếc cốc lửa',
      imageUrl:
        'https://www.nxbtre.com.vn/Images/Book/nxbtre_full_20342017_033410.jpg',
      description: '',
      author: 'J.K.Rowling',
      category: ['Lịch sử'],
      translator: 'Lý Lan',
      like: 5,
      view: 2024,
      dateCreated: Date.now().toString(),
      content: '',
    },
    {
      id: '2',
      name: 'Harry Potter và Hội phượng hoàng',
      imageUrl:
        'https://www.nxbtre.com.vn/Images/Book/nxbtre_full_08082017_090848.jpg',
      description: '',
      author: 'J.K.Rowling',
      category: ['Lịch sử'],
      translator: 'Lý Lan',
      like: 5,
      view: 2024,
      dateCreated: Date.now().toString(),
      content: '',
    },
    {
      id: '3',
      name: 'Fairy Tail: Nhiệm vụ 100 năm',
      imageUrl:
        'https://img.nettruyenfull.com/story/2024/01/12/19159/avatar.png',
      description: '',
      author: '',
      category: ['Lịch sử'],
      translator: '',
      like: 5,
      view: 2024,
      dateCreated: Date.now().toString(),
      content: '',
    },
    {
      id: '4',
      name: 'Harry Potter và Hòn đá phù thủy',
      imageUrl:
        'https://isach.info/images/story/cover/harry_potter_va_hon_da_phu_thuy__j_k_rowling.jpg',
      description: '',
      author: 'J.K.Rowling',
      category: ['Lịch sử'],
      translator: 'Lý Lan',
      like: 5,
      view: 2024,
      dateCreated: Date.now().toString(),
      content: '',
    },
    {
      id: '5',
      name: 'SPY x FAMILY CODE: White',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd-GEwK4zXVzljgYkfdfPE8xu0r7iyLzGotnlEkHF0shJLk3QuipacPpm_UsRd4j5EM_A&usqp=CAU',
      description: '',
      author: 'Endo Tatsuya',
      category: ['Lịch sử'],
      translator: '',
      like: 5,
      view: 2024,
      dateCreated: Date.now().toString(),
      content: '',
    },
    {
      id: '6',
      name: 'Tớ sẽ tìm cậu vào đêm trăng rằm',
      imageUrl:
        'https://salt.tikicdn.com/cache/w1200/ts/product/65/dd/e5/f29c67ac78577e5ab95a23db495ca171.jpg',
      description: '',
      author: 'Yozora Fuyuno',
      category: ['Lịch sử'],
      translator: '',
      like: 5,
      view: 2024,
      dateCreated: Date.now().toString(),
      content: '',
    },
    {
      id: '7',
      name: 'Yêu em từ cái nhìn đầu tiên',
      imageUrl:
        'https://salt.tikicdn.com/cache/w1200/media/catalog/product/y/e/yeu-em-tu-cai-nhin-dau-tien_1_1.jpg',
      description: '',
      author: 'Cố Mạn',
      category: ['Lịch sử'],
      translator: '',
      like: 5,
      view: 2024,
      dateCreated: Date.now().toString(),
      content: '',
    },
    {
      id: '8',
      name: 'Bên nhau trọn đời',
      imageUrl:
        'https://cdn0.fahasa.com/media/catalog/product/b/e/ben-nhau-tron-doi.jpeg',
      description: '',
      author: 'Cố mạn',
      category: ['Lịch sử'],
      translator: '',
      like: 5,
      view: 2024,
      dateCreated: Date.now().toString(),
      content: '',
    },
    {
      id: '9',
      name: 'Bên kia mây trời là nơi hẹn ước',
      imageUrl:
        'https://product.hstatic.net/200000287623/product/ben-kia-may-troi_26358d5f0d1947049ccae46bbd6f03b4.jpg',
      description: '',
      author: 'Shinkai Makoto',
      category: ['Lịch sử'],
      translator: '',
      like: 5,
      view: 2024,
      dateCreated: Date.now().toString(),
      content: '',
    },
    {
      id: '10',
      name: 'Những đứa trẻ đuổi theo tinh tú',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1581396823i/51168375.jpg',
      description: '',
      author: 'Shinkai Makoto',
      category: ['Lịch sử'],
      translator: '',
      like: 5,
      view: 2024,
      dateCreated: Date.now().toString(),
      content: '',
    },
  ];
}
