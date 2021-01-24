import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckValueService {

  constructor() { }

  hasNumberValue(n:number) {
    return n!==null && n!== undefined && !isNaN(n);
  }

  hasStringValue(s : string) {
    return s !== null && s !== undefined && s !=="";
  }

  hasArrayValue(a : any[]) {
    return a !== null && a != undefined && a.length>0;
  }
}
