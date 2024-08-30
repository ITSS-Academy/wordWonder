import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'removeQuotes',
})
export class RemoveQuotesPipe implements PipeTransform {
  transform(value: string): string {
    //remove the "" from the string with the replace method

    return value.replace(/['"]+/g, '');
  }
}
