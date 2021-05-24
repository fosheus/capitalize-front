import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class GenericService {

  constructor() { }

  public abstract getItemsLike(value: string, limit: number): Observable<string[]>;
}
