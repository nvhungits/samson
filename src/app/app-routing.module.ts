import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';
import { BcmediatvComponent } from './bcmediatv/bcmediatv.component';
import { ModuleDetailComponent } from './settings/module/module-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'settings', component: SettingsComponent},
  { path: 'settings/module/:id', component: ModuleDetailComponent},
  { path: 'login', component: LoginComponent},
  { path: 'bcmediatv', component: BcmediatvComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppRoutingModule { }
