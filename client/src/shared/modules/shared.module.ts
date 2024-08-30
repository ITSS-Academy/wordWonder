import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RemoveQuotesPipe } from '../../utils/remove-quotes.pipe';
import { RemoveExtraSpacesPipe } from '../../utils/remove-extra-spaces.pipe';

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
    RemoveExtraSpacesPipe,
  ],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AsyncPipe,
    DatePipe,
    JsonPipe,
    RemoveQuotesPipe,
    RemoveExtraSpacesPipe,
  ],
})
export class SharedModule {}
