import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';


import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { FilterObjectPipe } from './pipes/filter-object/filter-object.pipe';
import { FilterControlPipe } from './pipes/filter-control/filter-control.pipe';
import { AutocompleteChipsComponent } from './components/autocomplete-chips/autocomplete-chips.component';

registerLocaleData(localeFr, 'fr');


const MATERIAL_MODULES = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatChipsModule,
  MatTabsModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatAutocompleteModule,
  MatMenuModule,
  MatPaginatorModule
]

@NgModule({
  declarations: [FilterObjectPipe, FilterControlPipe, AutocompleteChipsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    HighlightModule,
    ...MATERIAL_MODULES
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    HighlightModule,
    FilterObjectPipe,
    FilterControlPipe,
    AutocompleteChipsComponent,
    ...MATERIAL_MODULES
  ],
  providers: [{ provide: HIGHLIGHT_OPTIONS, useValue: { fullLibraryLoader: () => import('highlight.js') } }, { provide: LOCALE_ID, useValue: 'fr' }, { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
  ]
})
export class SharedModule { }
