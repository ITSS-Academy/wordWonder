import { Injectable } from '@angular/core';
import {EBookModel} from "../models/ebook.model";

@Injectable({
  providedIn: 'root'
})
export class EbookService {

  private ebooks: EBookModel[] = [
    {
      id: 1,
      name: 'Harry Potter và Chiếc cốc lửa',
      imageUrl: 'https://www.nxbtre.com.vn/Images/Book/nxbtre_full_20342017_033410.jpg',
      description: '',
      author: 'J.K.Rowling',
      category: 'Lịch sử',
      genre: '',
      translator: 'Lý Lan',
      like: 5,
      view: 2024,
    },
    {
      id: 2,
      name: 'Gintama: The final',
      imageUrl: 'https://i.ebayimg.com/images/g/VLYAAOSwgVphVFqF/s-l1200.jpg',
      description: '',
      author: 'J.K.Rowling',
      category: 'Lịch sử',
      genre: 'Hành động',
      translator: 'Lý Lan',
      like: 5,
      view: 2024,
    },
    {
      id: 3,
      name: 'Fairy Tail: Nhiệm vụ 100 năm',
      imageUrl: 'https://img.nettruyenfull.com/story/2024/01/12/19159/avatar.png',
      description: '',
      author: '',
      category: 'Lịch sử',
      genre: '',
      translator: '',
      like: 5,
      view: 2024,
    },
    {
      id: 4,
      name: 'Harry Potter và Hòn đá phù thủy',
      imageUrl: 'https://isach.info/images/story/cover/harry_potter_va_hon_da_phu_thuy__j_k_rowling.jpg',
      description: '',
      author: 'J.K.Rowling',
      category: 'Lịch sử',
      genre: 'Viễn tưởng',
      translator: 'Lý Lan',
      like: 5,
      view: 2024,
    },
    {
      id: 5,
      name: 'SPY x FAMILY CODE: White',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd-GEwK4zXVzljgYkfdfPE8xu0r7iyLzGotnlEkHF0shJLk3QuipacPpm_UsRd4j5EM_A&usqp=CAU',
      description: '',
      author: 'Endo Tatsuya',
      category: 'Lịch sử',
      genre: 'Hành động',
      translator: '',
      like: 5,
      view: 2024,
    },
    {
      id: 6,
      name: 'Nobita và Lịch sử khai phá vũ trụ',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/vi/b/b1/Eiga_Doraemon_Shin_Nobita_No_Uchu_Kaitaku_Shi.jpg',
      description: '',
      author: 'Fujiko F. Fujio',
      category: 'Lịch sử',
      genre: 'Phiêu lưu',
      translator: '',
      like: 5,
      view: 2024,
    },
    {
      id: 7,
      name: 'Nobita và Bản giao hưởng địa cầu',
      imageUrl: 'https://product.hstatic.net/200000343865/product/doraemon-tieu-thuyet_nobita-va-ban-giao-huong-dia-cau_bia_62e39c436bdc4343afb79847062df2f2.jpg',
      description: '',
      author: 'Fujiko F. Fujio',
      category: 'Lịch sử',
      genre: 'Phiêu lưu',
      translator: '',
      like: 5,
      view: 2024,
    },
  ]

  getEbooks(): EBookModel[]{
    return this.ebooks;
  }

  getEbooksByCategory(category: string): EBookModel[] {
    return this.ebooks.filter(ebook => ebook.category === category);
  }

}
