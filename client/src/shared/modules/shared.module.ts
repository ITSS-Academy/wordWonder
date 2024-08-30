import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RemoveQuotesPipe } from '../../utils/remove-quotes.pipe';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AsyncPipe,
    DatePipe,
    JsonPipe,
    RemoveQuotesPipe,
  ],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AsyncPipe,
    DatePipe,
    JsonPipe,
    RemoveQuotesPipe,
  ],
})
export class SharedModule {}
