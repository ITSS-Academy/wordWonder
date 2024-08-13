import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import {TableComponent} from "./table/table.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [SharedModule, MaterialModule, TableComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {}
