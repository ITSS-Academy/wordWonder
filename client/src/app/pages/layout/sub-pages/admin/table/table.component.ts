import {Component, ViewChild} from '@angular/core';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatCheckbox} from "@angular/material/checkbox";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatPaginator,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatCellDef,
    MatCheckbox
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  displayedColumns: string[] = ['select', 'name', 'author', 'postDate', 'reads', 'description', 'status'];
  dataSource = new MatTableDataSource<PostElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
  }

  masterToggle() {
    return null;
  }

  isAllSelected() {
    return undefined;
  }

  isIndeterminate() {
    return undefined;
  }
}

export interface PostElement {
  name: string;
  author: string;
  postDate: string;
  reads: number;
  description: string;
  status: string;
  selected: boolean;
}

const ELEMENT_DATA: PostElement[] = [
  {name: 'Post 1', author: 'Author 1', postDate: '2024-01-01', reads: 100, description: 'Description 1', status: 'Published', selected: false},
  {name: 'Post 2', author: 'Author 2', postDate: '2024-01-02', reads: 200, description: 'Description 2', status: 'Draft', selected: false},
  {name: 'Post 3', author: 'Author 3', postDate: '2024-01-03', reads: 300, description: 'Description 3', status: 'Published', selected: false},
  {name: 'Post 4', author: 'Author 4', postDate: '2024-01-04', reads: 400, description: 'Description 4', status: 'Draft', selected: false},
  {name: 'Post 5', author: 'Author 5', postDate: '2024-01-05', reads: 500, description: 'Description 5', status: 'Published', selected: false},
  {name: 'Post 6', author: 'Author 6', postDate: '2024-01-06', reads: 600, description: 'Description 6', status: 'Draft', selected: false},
  {name: 'Post 7', author: 'Author 7', postDate: '2024-01-07', reads: 700, description: 'Description 7', status: 'Published', selected: false},
  {name: 'Post 8', author: 'Author 8', postDate: '2024-01-08', reads: 800, description: 'Description 8', status: 'Draft', selected: false},
  {name: 'Post 9', author: 'Author 9', postDate: '2024-01-09', reads: 900, description: 'Description 9', status: 'Published', selected: false},
  {name: 'Post 10', author: 'Author 10', postDate: '2024-01-10', reads: 1000, description: 'Description 10', status: 'Draft', selected: false},
  {name: 'Post 11', author: 'Author 11', postDate: '2024-01-11', reads: 1100, description: 'Description 11', status: 'Published', selected: false},
  {name: 'Post 12', author: 'Author 12', postDate: '2024-01-12', reads: 1200, description: 'Description 12', status: 'Draft', selected: false},
  {name: 'Post 13', author: 'Author 13', postDate: '2024-01-13', reads: 1300, description: 'Description 13', status: 'Published', selected: false},
  {name: 'Post 14', author: 'Author 14', postDate: '2024-01-14', reads: 1400, description: 'Description 14', status: 'Draft', selected: false},
  {name: 'Post 15', author: 'Author 15', postDate: '2024-01-15', reads: 1500, description: 'Description 15', status: 'Published', selected: false},
];
