import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import { EBookModel, GENRES } from '../../../models/ebook.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../ngrxs/auth/auth.state';
import { Subscription } from 'rxjs';
import * as AuthActions from '../../../ngrxs/auth/auth.actions';

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

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MaterialModule, SharedModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChild('dropdown') dropdown!: ElementRef;

  subscriptions: Subscription[] = [];
  isStaticUser = false;

  searchControl = new FormControl('');
  showDropdown = false;

  ebooks = Array.from({ length: 10 }, (_, k) => createNewEbook(k + 1));

  readonly dialog = inject(MatDialog);
  private renderer = inject(Renderer2);

  constructor(
    private store: Store<{ auth: AuthState }>,
    private router: Router,
  ) {
    this.searchControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        if (value !== '') {
          this.showDropdown = true;
          this.setPosition();
          if (this.dropdown) {
            this.renderer.setStyle(this.dropdown.nativeElement, 'opacity', '1');
            this.renderer.setStyle(
              this.dropdown.nativeElement,
              'transform',
              'translateY(0)',
            );
          }
        } else {
          if (this.dropdown) {
            this.renderer.setStyle(this.dropdown.nativeElement, 'opacity', '0');
            this.renderer.setStyle(
              this.dropdown.nativeElement,
              'transform',
              'translateY(-10px)',
            );
            this.dropdown.nativeElement.addEventListener(
              'transitionend',
              () => {
                this.showDropdown = false;
              },
              { once: true },
            );
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select('auth', 'isStaticUser').subscribe((isStaticUser) => {
        this.isStaticUser = isStaticUser;
      }),
      this.store.select('auth', 'idToken').subscribe((val) => {
        if (val == '') {
          this.router.navigate(['/login']).then(() => {
            console.log('toc');
          });
        }
      }),
    );
  }

  ngAfterViewInit() {
    this.setPosition();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setPosition();
  }

  setPosition() {
    if (this.searchInput && this.dropdown) {
      const rect = this.searchInput.nativeElement.getBoundingClientRect();
      this.renderer.setStyle(
        this.dropdown.nativeElement,
        'top',
        `${rect.bottom + 13}px`,
      );
      this.renderer.setStyle(
        this.dropdown.nativeElement,
        'left',
        `${rect.left - 50}px`,
      );
      this.renderer.setStyle(
        this.dropdown.nativeElement,
        'width',
        `${rect.width + 66}px`,
      );
    }
  }

  openConfirmLogoutDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Đăng xuất',
        message: 'Bạn có chắc chắn muốn đăng xuất?',
      },
      restoreFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result == true) {
        this.logout();
      }
    });
  }

  navigateToProfile() {
    this.router.navigate(['/main/profile']).then(() => {});
  }

  logout() {
    this.store.dispatch(AuthActions.signOut());
  }

  navigateToEbookDetailPage(ebook: EBookModel) {
    this.router.navigate(['/main/book-info', ebook.id]).then(() => {
      this.searchControl.setValue('');
    });
  }
}

/** Builds and returns a new User. */
export function createNewEbook(id: number): EBookModel {
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
    dateCreated: (
      Number(Date.now().toString()) + Math.round(Math.random() * 1000)
    ).toString(),
    view: Math.round(Math.random() * 1000),
    like: Math.round(Math.random() * 100),
    content: 'This is content of ' + name,
    category: category,
  };
}
