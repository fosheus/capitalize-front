import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckValueService {

  constructor() { }

  hasNumberValue(n: number): boolean {
    return n !== null && n !== undefined && !isNaN(n);
  }

  hasStringValue(s: string): boolean {
    return s !== null && s !== undefined && s !== '';
  }

  hasArrayValue(a: any[]): boolean {
    return a !== null && a !== undefined && a.length > 0;
  }
}
