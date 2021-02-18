import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ChildComponent } from './child/child.component';
import { dateFormatPipe } from './shared/pipe/date.pipe';
import { DatePipe } from '@angular/common';
import { AuthGuard } from './core/authGuard';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { MaterialModule } from './shared/material/material.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";
import { ChangebgcolorDirective } from './shared/directives/changebgcolor.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChildComponent,
    dateFormatPipe,
    PagenotfoundComponent,
    ChangebgcolorDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),

  ],
  exports: [
    MaterialModule
  ],

  providers: [HttpClientModule, DatePipe, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
