import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterObject',
  pure: false
})
export class FilterObjectPipe implements PipeTransform {

  transform(array: any[], property: string, filter: any): any[] {
    if (array && filter && property) {
      return array.filter(item => item[property] === filter);
    }
    return array;
  }

}
