import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PostTag } from 'src/app/core/models/post-tag.model';
import { GenericService } from 'src/app/core/services/generic-service/generic.service';

@Component({
  selector: 'app-autocomplete-chips',
  templateUrl: './autocomplete-chips.component.html',
  styleUrls: ['./autocomplete-chips.component.scss']
})
export class AutocompleteChipsComponent implements OnInit {


  @ViewChild('input') input: ElementRef<HTMLInputElement>;

  public inputControl = new FormControl();
  public autoCompleteOptions: Observable<string[]>;
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  private timeoutSearch: any;
  public elements: string[] = [];


  @Output() newElementEvent = new EventEmitter<string>();
  @Output() removeElementEvent = new EventEmitter<number>();
  @Input() limit: number;
  @Input() placeholder: string;
  @Input() label: string;
  @Input() service: GenericService;

  constructor() { }

  ngOnInit(): void {
    this.inputControl.valueChanges.pipe(tap((value) => {
      clearTimeout(this.timeoutSearch);
      this.timeoutSearch = setTimeout(() => {
        this.autoCompleteOptions = value !== null && value !== undefined && value.length > 1 ? this.service.getItemsLike(value, this.limit) : of([])
      }, 500);
    })).subscribe();

  }

  removeElement(index: number) {
    this.elements.splice(index, 1);
    this.removeElementEvent.emit(index);
  }

  addElement(event: MatChipInputEvent) {
    if (event.value && this.elements.find((e: any) => e.toLowerCase() === event.value.toLowerCase()) === undefined) {
      this.newElementEvent.emit(event.value);
      this.elements.push(event.value);
    }
    if (event.input) {
      event.input.value = '';
      this.autoCompleteOptions = of([]);
    }
  }

  selectOption(event: MatAutocompleteSelectedEvent) {
    if (this.elements.find((e: any) => e.toLowerCase() === event.option.viewValue.toLowerCase()) === undefined) {
      this.newElementEvent.emit(event.option.viewValue);
      this.elements.push(event.option.viewValue);

    }
    this.input.nativeElement.value = '';
    this.inputControl.setValue(null);
    this.autoCompleteOptions = of([]);

  }


}
