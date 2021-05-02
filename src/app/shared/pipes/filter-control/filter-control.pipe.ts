import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterControl',
  pure: false
})
export class FilterControlPipe implements PipeTransform {
  transform(array: any[], property: string, filter: any): any[] {
    if (array && filter && property) {
      const res = array.filter(item => item.value[property] === filter);
      console.log(res);
      return res;
    }
    return array;
  }

}
