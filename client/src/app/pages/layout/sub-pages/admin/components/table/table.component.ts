import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {
  MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSort, MatSortModule} from "@angular/material/sort";

export interface UserData {
  name: string;
  author: string;
  dateCreated: string;
  view: number;
  describe: string;
  status: string;
}

const NAMES: string[] = [
  'Harry Potter', 'The Hobbit', 'The Lord of the Rings', 'The Great Gatsby', 'To Kill a Mockingbird', 'The Catcher in the Rye', 'The Da Vinci Code', 'The Alchemist', 'The Kite Runner', 'The Book Thief', 'The Hunger Games',];

const author: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

const postingDate: string[] = [
  '2021-01-01', '2021-01-02', '2021-01-03', '2021-01-04', '2021-01-05', '2021-01-06', '2021-01-07', '2021-01-08', '2021-01-09', '2021-01-10', '2021-01-11', '2021-01-12', '2021-01-13', '2021-01-14', '2021-01-15', '2021-01-16', '2021-01-17', '2021-01-18', '2021-01-19', '2021-01-20'
];

const view: number[] = [
  100, 200, 300, 400, 500, 600, 700, 800, 900, 1000
];

const describe: string[] = [
  'Harry Potter is a series of seven fantasy novels ....',
  'The Hobbit, or There and Back Again is a childrens ...',
  'The Lord of the Rings is an epic high-fantasy novel ...',
  'The Great Gatsby is a 1925 novel by American writer...',
  'To Kill a Mockingbird is a novel by the American author...',
  'The Catcher in the Rye is a novel by J. D. Salinger, ...',
  'The Da Vinci Code is a 2003 mystery thriller novel by ...',
  'The Alchemist is a novel by Brazilian author ..git     .',
  ];

const status: string[] = [
  'Available', 'Unavailable'
];



@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'author', 'dateCreated', 'view', 'describe', 'status'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    name: name,
    author: author[Math.round(Math.random() * (author.length - 1))],
    dateCreated: postingDate[Math.round(Math.random() * (postingDate.length - 1))],
    view: view[Math.round(Math.random() * (view.length - 1))],
    describe: describe[Math.round(Math.random() * (describe.length - 1))],
    status: status[Math.round(Math.random() * (status.length - 1))]
  };
}
