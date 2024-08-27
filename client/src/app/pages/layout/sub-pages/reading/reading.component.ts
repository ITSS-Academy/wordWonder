import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
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
export class ReadingComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(SettingsDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    const textOutput = document.getElementById('text-output') as HTMLElement;

    fileInput.addEventListener('change', () => {
      const file = fileInput.files?.[0];

      if (file) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = async () => {
          if (reader.result) {
            const pdf = await (window as any).pdfjsLib.getDocument({
              data: reader.result,
            }).promise;
            const maxPages = pdf.numPages;

            let text = '';
            for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
              const page = await pdf.getPage(pageNum);
              const content = await page.getTextContent();
              const pageText = content.items
                .map((item: any) => item.str)
                .join('\n');
              text += pageText + '\n';
            }

            textOutput.textContent = text;
          }
        };
      }
    });
  }
}
