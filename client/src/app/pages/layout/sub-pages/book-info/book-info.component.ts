import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { NgStyle } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-info',
  standalone: true,
  imports: [SharedModule, MaterialModule, NgStyle],
  templateUrl: './book-info.component.html',
  styleUrl: './book-info.component.scss',
})
export class BookInfoComponent implements OnInit, OnDestroy {
  //genres but vietnamese
  genres = [
    'Khoa học',
    'Kinh tế',
    'Tâm lý',
    'Kỹ năng sống',
    'Thiếu nhi',
    'Truyện tranh',
    'Văn học',
    'Tôn giáo',
    'Tự truyện',
    'Tâm linh',
    'Thể thao',
    'Sức khỏe',
    'Sách giáo khoa',
    'Sách học ngoại ngữ',
    'Sách tham khảo',
    'Sách chuyên ngành',
    'Sách kỹ năng',
    'Sách khoa học',
    'Sách kinh doanh',
    'Sách lịch sử',
    'Sách phong thủy',
    'Sách tâm lý',
    'Sách thiếu nhi',
    'Sách trinh thám',
    'Sách văn học',
    'Sách văn hóa',
    'Sách văn học nước ngoài',
    'Sách văn học Việt Nam',
    'Sách văn học dân gian',
    'Sách văn học kinh điển',
    'Sách văn học hiện đại',
    'Sách văn học trinh thám',
    'Sách văn học tình cảm',
    'Sách văn học huyền bí',
    'Sách văn học hồi ký',
    'Sách văn học kỳ ảo',
    'Sách văn học kinh điển',
    'Sách văn học lịch sử',
    'Sách văn học lãng mạn',
    'Sách văn học ngôn tình',
    'Sách văn học phiêu lưu',
    'Sách văn học tâm lý',
    'Sách văn học tình yêu',
    'Sách văn học trinh thám',
    'Sách văn học tương lai',
    'Sách văn học viễn tưởng',
    'Sách văn học xã hội',
    'Sách văn học xuyên không',
  ];

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {}
  isLoading: boolean = true;
  ngOnInit(): void {
    // Simulate loading time
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  ngOnDestroy(): void {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  read() {
    this.router.navigate(['/main/reading']).then();
  }

  goBackToHome(): void {
    this.router.navigate(['/main']).then();
  }
}
