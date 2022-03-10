import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {Component} from '@angular/core';
import { DatasetArrayPipe } from './dataset-array.pipe';
import { PartialsetArrayPipe } from './partialset-array.pipe';
import { HelpersetArrayPipe } from './helperset-array.pipe';
import { TemplateArrayPipe } from './template-array.pipe';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { AxiosOptionsComponent } from './axios-options/axios-options.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    DatasetArrayPipe,
    PartialsetArrayPipe,
    HelpersetArrayPipe,
    TemplateArrayPipe,
    AxiosOptionsComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    CdkAccordionModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
