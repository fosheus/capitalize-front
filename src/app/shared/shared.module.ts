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
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';



const MATERIAL_MODULES = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatChipsModule,
  MatTabsModule
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
  providers: [{ provide: HIGHLIGHT_OPTIONS, useValue: { fullLibraryLoader: () => import('highlight.js') } }]
})
export class SharedModule { }
