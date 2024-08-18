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
      name: 'Lord of the Ring: The return of the King',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4DWN6yfVzikFB8y-2HvRHSz68cXDcL1KiFw&s',
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
      id: '6',
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
      id: '7',
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
      id: '8',
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
      id: '9',
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
    {
      id: '10',
      name: 'Và rồi tháng 9 không có cậu đã tới',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1585286099i/52732003.jpg',
      description: '',
      author: 'Natsuki Amasawa',
      category: ['Lịch sử'],
      translator: 'Lý Lan',
      like: 5,
      view: 2024,
      dateCreated: Date.now().toString(),
      content: '',
    },
    {
      id: '11',
      name: 'Little Woman',
      imageUrl:
        'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781625586988/little-women-9781625586988_hr.jpg',
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
      id: '12',
      name: 'Fairy Tail: Nhiệm vụ 100 năm',
      imageUrl:
        'https://img.nettruyenfull.com/story/2024/01/12/19159/avatar.png',
      description: '',
      author: 'J.R.R. Tolkien',
      category: ['Lịch sử'],
      translator: '',
      like: 5,
      view: 2024,
      dateCreated: Date.now().toString(),
      content: '',
    },
    {
      id: '13',
      name: 'Fruits Basket',
      imageUrl:
        'https://d19ri4mdy82u9u.cloudfront.net/images/6483e18f03c3da4c3aaed853/t0Up51V9fZqrTUoDcLK2.jpg',
      description: '',
      author: 'Natsuki Takaya',
      category: ['Lịch sử'],
      translator: '',
      like: 5,
      view: 2024,
      dateCreated: Date.now().toString(),
      content: '',
    },
    {
      id: '14',
      name: 'Your Name',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/vi/b/b3/Your_Name_novel.jpg',
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
      id: '15',
      name: 'Tôi như ánh dương rực rỡ',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGEGza0BVPsqgkub4wkVoUt6795fjlXaFPrQ&s',
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
      id: '16',
      name: 'ReLife',
      imageUrl:
        'https://animeforums.net/uploads/monthly_2015_06/relife.jpg.eee63f859dfaa232392d4a51106e6166.jpg',
      description: '',
      author: 'Yayoiso So',
      category: ['Lịch sử'],
      translator: '',
      like: 5,
      view: 2024,
      dateCreated: Date.now().toString(),
      content: '',
    },
    {
      id: '17',
      name: 'The return of Sherlock Holmes',
      imageUrl:
        'https://rukminim2.flixcart.com/image/850/1000/kk76wsw0/book/z/8/x/the-memoirs-of-sherlock-holmes-original-imafzhvzahzww2tx.jpeg?q=20&crop=false',
      description: '',
      author: 'Conan Doyle',
      category: ['Lịch sử'],
      translator: '',
      like: 5,
      view: 2024,
      dateCreated: Date.now().toString(),
      content: '',
    },
    {
      id: '18',
      name: 'Orange',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/it/c/cd/Orange_manga.jpg',
      description: '',
      author: 'Takano Ichigo',
      category: ['Lịch sử'],
      translator: '',
      like: 5,
      view: 2024,
      dateCreated: Date.now().toString(),
      content: '',
    },
    {
      id: '19',
      name: 'Wolf Children',
      imageUrl:
        'https://m.media-amazon.com/images/I/81nkVymtO0L._AC_UF1000,1000_QL80_.jpg',
      description: '',
      author: 'Mamoru Hosoda',
      category: ['Lịch sử'],
      translator: '',
      like: 5,
      view: 2024,
      dateCreated: Date.now().toString(),
      content: '',
    },
    {
      id: '20',
      name: 'Vua bếp Soma',
      imageUrl:
        'https://m.media-amazon.com/images/I/81-dEBDvb+L._AC_UY327_FMwebp_QL65_.jpg',
      description: '',
      author: 'Yuto Tsukuda',
      category: ['Lịch sử'],
      translator: '',
      like: 5,
      view: 2024,
      dateCreated: Date.now().toString(),
      content: '',
    },
  ];
}
