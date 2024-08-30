import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'removeExtraSpaces',
})
export class RemoveExtraSpacesPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/\n\s*\n/g, '\n');
  }
}
