import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { MatDialog } from '@angular/material/dialog';
import { SettingsDialogComponent } from './components/settings-dialog/settings-dialog.component';

@Component({
  selector: 'app-reading',
  standalone: true,
  imports: [SharedModule, MaterialModule],
  templateUrl: './reading.component.html',
  styleUrl: './reading.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadingComponent {
  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(SettingsDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
