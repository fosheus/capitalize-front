import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nl2br'
})
export class Nl2brPipe implements PipeTransform {

  transform(value: string): string {
    if (!value || value.length === 0) {
      return value;
    }

    const ret = value.replace(/\n/g, '<br>');
    return ret;
  }

}
