import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';
import { BcmediatvComponent } from './bcmediatv/bcmediatv.component';
import { ModuleDetailComponent } from './settings/module/module-detail.component';
import { PostDetailComponent } from './settings/post/post-detail.component';
import { BcmediatvDetailComponent } from './bcmediatv/bcmediatv-detail.component';
import { NewsComponent } from './bcmediatv/news.component';
import { SettingSlidersComponent } from './settings/setting-sliders/setting-sliders.component';
import { AboutUsComponent } from './bcmediatv/about-us.component';
import { SectorsComponent } from './bcmediatv/sectors.component';
import { TeamBuildingsComponent } from './bcmediatv/teambuildings.component';
import { PromotionsComponent } from './bcmediatv/promotion.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'settings', component: SettingsComponent},
  { path: 'settings/module/:id', component: ModuleDetailComponent},
  { path: 'settings/post/:id', component: PostDetailComponent},
  { path: 'settings/slider', component: SettingSlidersComponent},
  { path: 'login', component: LoginComponent},
  { path: 'bcmediatv', component: BcmediatvComponent},
  { path: 'aboutus', component: AboutUsComponent},
  { path: 'post/:id', component: BcmediatvDetailComponent},
  { path: 'news', component: NewsComponent},
  { path: 'sectors', component: SectorsComponent},
  { path: 'sectors/:child_id', component: SectorsComponent},
  { path: 'teambuidings', component: TeamBuildingsComponent},
  { path: 'promotions', component: PromotionsComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppRoutingModule { }
