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

import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

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
  MatButtonToggleModule
]

@NgModule({
  declarations: [],
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
    ...MATERIAL_MODULES
  ],
  providers: [{ provide: HIGHLIGHT_OPTIONS, useValue: { fullLibraryLoader: () => import('highlight.js') } }, { provide: LOCALE_ID, useValue: 'fr' }]
})
export class SharedModule { }
