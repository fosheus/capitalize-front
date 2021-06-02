import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteChipsComponent } from './autocomplete-chips.component';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClient } from '@angular/common/http';

describe('AutocompleteChipsComponent', () => {
    let component: AutocompleteChipsComponent;
    let fixture: ComponentFixture<AutocompleteChipsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatAutocompleteModule],
            declarations: [AutocompleteChipsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AutocompleteChipsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
