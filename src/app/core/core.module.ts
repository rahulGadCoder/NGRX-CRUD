import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadarComponent } from './headar/headar.component';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HeadarComponent],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule
  ],
  exports: [HeadarComponent]
})
export class CoreModule { }
