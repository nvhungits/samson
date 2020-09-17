import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './header/menu/menu.component';
import { SliderComponent } from './slider/slider.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {DragDropModule} from '@angular/cdk/drag-drop';
import { ServiceComponent } from './home/service/service.component';
import { ActivityComponent } from './home/activity/activity.component';
import { CategoryComponent } from './home/category/category.component';
import { NewsfeedComponent } from './home/newsfeed/newsfeed.component';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    HeaderComponent,
    MenuComponent,
    SliderComponent,
    HomeComponent,
    ServiceComponent,
    ActivityComponent,
    CategoryComponent,
    NewsfeedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
