import { Injectable } from '@angular/core';
import { EBookModel, GENRES } from '../models/ebook.model';
import {HttpClientAuth} from "../utils/http-client-auth";

/** Constants used to fill up our data base. */
const NAMES: string[] = [
  'Around the World in Eighty Days',
  'The War of the Worlds',
  'The Time Machine',
  'The Invisible',
  'The Island of Doctor Moreau',
  'The First',
  'The Lost World',
  'The Call of the Wild',
  'The Picture of Dorian Gray',
  'The Adventures of Sherlock Holmes',
  'The Hound of the Baskervilles',
  'The Sign of the Four',
  'The Valley of Fear',
  'The Adventures of Tom Sawyer',
  'The Adventures of Huckleberry Finn',
  'The Prince and the Pauper',
  "A Connecticut Yankee in King Arthur's Court",
  "The Tragedy of Pudd'nhead Wilson",
  'The Innocents Abroad',
  'Roughing It',
  'The Gilded Age',
  'A Tramp Abroad',
  'Life on the Mississippi',
  'Alice in Wonderland',
  'Through the Looking Glass',
  'The Hunting of the Snark',
  'The Secret Garden',
  'A Little Princess',
  'Little Lord Fauntleroy',
  'The Lost Prince',
  'The Railway Children',
  'Five Children and It',
  'The Phoenix and the Carpet',
  'The Story of the Amulet',
  'The Enchanted Castle',
  'Hard Times',
  'Great Expectations',
  'A Christmas Carol',
  'Oliver Twist',
  'David Copperfield',
  'Bleak House',
  'Little Dorrit',
  'The Pickwick Papers',
  'Our Mutual Friend',
  'The Old Curiosity Shop',
  'Nicholas Nickleby',
  'Martin Chuzzlewit',
  'Dombey and Son',
  'The Mystery of Edwin Drood',
  'The Chimes',
  'The Cricket on the Hearth',
  'The Battle of Life',
  'The Ha',
  'Gone with the Wind',
  'The Great Gatsby',
  'To Kill a Mockingbird',
  'The Catcher in the Rye',
  'The Grapes of Wrath',
  'The Lord of the Rings',
  'The Hobbit',
  'The Silmarillion',
  'The Two Towers',
  'The Return of the King',
  'The Fellowship of the Ring',
  'The Adventures of Huckleberry Finn',
  'The Good Earth',
  'The Sun Also Rises',
  'The Old',
  'The Godfather',
  'The Godfather Returns',
  "The Godfather's Revenge",
  "Harry Potter and the Philosopher's Stone",
  'Harry Potter and the Chamber of Secrets',
  'Harry Potter and the Prisoner of Azkaban',
  'Harry Potter and the Goblet of Fire',
  'Harry Potter and the Order of the Phoenix',
  'Harry Potter and the Half-Blood Prince',
  'Harry Potter and the Deathly Hallows',
  'The Da Vinci Code',
  'Angels & Demons',
  'The Lost Symbol',
  'Inferno',
  'Origin',
  'Digital Fortress',
  'Deception Point',
  'The Hunger Games',
  'Catching Fire',
  'Mockingjay',
  'The Ballad of Songbirds and Snakes',
  'The Maze Runner',
  'The Scorch Trials',
  'The Death Cure',
  'The Kill Order',
  'The Fever Code',
  'The Outsiders',
  'That Was Then, This Is Now',
  'Rumble Fish',
  'Tex',
  'Taming the Star Runner',
  'Holes',
  'Small Steps',
  'Wayside School is Falling Down',
  'Wayside School Gets a Little Stranger',
  'Sideways Stories from Wayside School',
  'The Giver',
  'Gathering Blue',
  'Messenger',
  'Son',
  'Number the Stars',
  'Anastasia Krupnik',
  'The Giver',
  'Finale',
  'Caraval',
  'Shatter Me',
  'Restore Me',
  'Ignite Me',
  'Unravel Me',
  'Defy Me',
  'Destroy Me',
  'The Selection',
  'The Elite',
  'The One',
  'The Heir',
  'The Crown',
  'The Prince',
  'The Guard',
  'The Queen',
  'The Favorite',
  'The Siren',
  'The Betrothed',
  'The Traitor',
  'The Queen of Nothing',
  'The Wicked King',
  'The Cruel Prince',
  'The Lost Sisters',
  'The Darkest Part of the Forest',
  'The Col',
  'Green Eggs and Ham',
  'The Cat in the Hat',
  'One Fish Two Fish Red Fish Blue Fish',
  'Horton Hears a Who!',
  'How the Grinch Stole Christmas!',
  'Fox in Socks',
  'The Lorax',
  'Oh, the Places You’ll Go!',
  'The Sneetches and Other Stories',
  'Dr. Seuss’s Sleep Book',
  'Hop on Pop',
  'Scrambled Eggs Super!',
  'The Butter Battle Book',
  'I Had Trouble in Getting to Solla Sollew',
  'If I Ran the Circus',
  'If I Ran the Zoo',
  'The 500 Hats of Bartholomew Cubbins',
  'The King’s Stilts',
  'McElligot’s Pool',
  'On Beyond Zebra!',
  'Thidwick the Big-Hearted Moose',
  'Yertle the Turtle and Other Stories',
  'Bartholomew and the Oobleck',
  'Daisy-Head Mayzie',
  'Did I Ever Tell You How Lucky You Are?',
  'Dr. Seuss’s ABC',
  'Gerald McBoing Boing',
  'Happy Birthday to You!',
  'Horton Hatches the Egg',
];
const AUTHORS: string[] = [
  'Jules Verne',
  'H.G. Wells',
  'Oscar Wilde',
  'Arthur Conan Doyle',
  'Mark Twain',
  'Frances Hodgson Burnett',
  'Charles Dickens',
  'Margaret Mitchell',
  'F. Scott Fitzgerald',
  'Harper Lee',
  'J.R.R. Tolkien',
  'John Steinbeck',
  'Mario Puzo',
  'J.K. Rowling',
  'Dan Brown',
  'Suzanne Collins',
  'James Dashner',
  'S.E. Hinton',
  'Lois Lowry',
  'Stephanie Garber',
  'Tahereh Mafi',
  'Kiera Cass',
];

@Injectable({
  providedIn: 'root',
})
export class EbookService {
  getEbooks(): EBookModel[] {
    return this.ebooks;
  }

  constructor(private  http: HttpClientAuth) {}


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
      content: '',
    },
  ];

  /** Builds and returns a new User. */
  createNewEbook(id: number): EBookModel {
    const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
      ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
      '.';

    //random genre and number of genre from GENRES
    const category = [];
    const num = Math.round(Math.random() * 5);
    for (let i = 0; i < num; i++) {
      category.push(GENRES[Math.round(Math.random() * (GENRES.length - 1))]);
    }

    return {
      id: id.toString(),
      name: name,
      author: AUTHORS[Math.round(Math.random() * (AUTHORS.length - 1))],
      description: 'This is a detail of ' + name,
      imageUrl: 'public/assets/poster.jpg',
      translator: 'Translator of ' + name,
      view: Math.round(Math.random() * 1000),
      like: Math.round(Math.random() * 100),
      content: 'This is content of ' + name,
      category: category,
    };
  }



  //findAll
  getEbookLists() {
    return this.http.get('ebooks');
  }

  //findOne
  getEbookDetail(id: string) {
    return this.http.get(`ebooks/${id}`);
  }

  //add new book
  addEbook(ebook: EBookModel) {
    return this.http.post('ebooks', ebook);
  }

  //update book
  updateEbook(ebook: EBookModel) {
    return this.http.patch(`ebooks/${ebook.id}`, ebook);
  }

  //trend
  listTrendEbooks(limit:number) {
    return this.http.get('ebooks/trend?limit=' + limit);
  }

  //find by rating
  getEbookByRating(limit:number) {
    return this.http.get('ebooks/rating?limit=' + limit);
  }

  //view
  increaseView(id:string) {
    return this.http.get('ebooks/view/' + id);
  }

  //increase view
  like(id:string) {
    return this.http.patch(`ebooks/like/${id}`, {});
  }

  //decrease view
  disLike(id: string) {
    return this.http.put(`ebooks/dislike/${id}`, {});
  }

  //find by recommend
  getRecommendEbooks(limit:number) {
    return this.http.get(`ebooks/recommend?limit=${limit}`);
  }
}
