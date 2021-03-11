import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { MatSnackBarModule } from '@angular/material/snack-bar'; 

import { HomeComponent } from './components/home/home.component';
import { BloggersComponent } from './components/bloggers/bloggers.component';
import { BloggerComponent } from './components/blogger/blogger.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BloggersComponent,
    BloggerComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSnackBarModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
