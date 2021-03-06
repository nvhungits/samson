import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';

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
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';
import { BcmediatvComponent } from './bcmediatv/bcmediatv.component';
import { CompanyInfoComponent } from './settings/company-info/company-info.component';
import { ModuleComponent } from './settings/module/module.component';
import { ModuleDetailComponent } from './settings/module/module-detail.component';
import { ActivitySettingsComponent } from './settings/activity/activity.component';
import { ActivitySettingsDetailComponent } from './settings/activity/activity-detail.component';

import { NgSelect2Module } from 'ng-select2';
import { PostComponent } from './settings/post/post.component';
import { PostDetailComponent } from './settings/post/post-detail.component';
import { BcmediatvDetailComponent } from './bcmediatv/bcmediatv-detail.component';
import { AboutUsComponent } from './bcmediatv/about-us.component';
import { NewsComponent } from './bcmediatv/news.component';
import { SectorsComponent } from './bcmediatv/sectors.component';
import { TeamBuildingsComponent } from './bcmediatv/teambuildings.component';
import { PromotionsComponent } from './bcmediatv/promotion.component';


import { QuillModule } from 'ngx-quill';
import { SettingSlidersComponent } from './settings/setting-sliders/setting-sliders.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SideBarComponent } from './bcmediatv/SubComponent/side-bar/side-bar.component';
import { ThuvienComponent } from './thuvien/thuvien.component';
import { ThuvienDetailComponent } from './thuvien/thuvien-detail/thuvien-detail.component';

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
    NewsfeedComponent,
    SettingsComponent,
    LoginComponent,
    BcmediatvComponent,
    CompanyInfoComponent,
    ModuleComponent,
    ModuleDetailComponent,
    PostComponent,
    PostDetailComponent,
    BcmediatvDetailComponent,
    AboutUsComponent,
    NewsComponent,
    SettingSlidersComponent,
    SectorsComponent,
    TeamBuildingsComponent,
    PromotionsComponent,
    SideBarComponent,
    ActivitySettingsComponent,
    ActivitySettingsDetailComponent,
    ThuvienComponent,
    ThuvienDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule,
    NgSelect2Module,
    QuillModule.forRoot({
      customOptions: [{
        import: 'formats/font',
        whitelist: ['mirza', 'roboto', 'aref', 'serif', 'sansserif', 'monospace']
      }]
    }),
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
