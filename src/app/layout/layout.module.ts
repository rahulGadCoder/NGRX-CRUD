import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberDirective } from '../shared/directives/numbersOnly.directive';
import { AphanemericDirective } from '../shared/directives/alphabetOnly.directive';
import { EmpDetailsComponent } from './emp-details/emp-details.component';
import { HeadarComponent } from '../core/headar/headar.component';
import { CoreModule } from '../core/core.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProductComponent } from './product/product.component';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ProfileComponent } from './profile/profile.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AgGridComponent } from './ag-grid/ag-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from '../shared/material/material.module';
import { StoreModule } from '@ngrx/store';
import { empReducer } from './state/emp.reducer';
import { EffectsModule, Actions } from '@ngrx/effects'; 
import { EmpEffects } from './state/emp.effects';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [DashboardComponent, HomeComponent, NumberDirective, AphanemericDirective, EmpDetailsComponent, ProductComponent, ProfileComponent, AgGridComponent, TestComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    Ng2SearchPipeModule,
    CalendarModule,
    DropdownModule,
    SplitButtonModule,
    AutoCompleteModule,
    MaterialModule,
    AgGridModule.withComponents([]),
    StoreModule.forFeature("emp", empReducer),
    EffectsModule.forFeature([EmpEffects])
  ],
  entryComponents: [HeadarComponent],
  providers: []
})
export class LayoutModule { }
