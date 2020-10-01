import { Component, OnInit } from '@angular/core';

import { Company } from '../services/company';
import { Menu } from '../services/menu';
import { CompanyService } from '../services/company.service';
import { HeaderService }  from '../services/header.service';

import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  companyDB: Company
  menusDB = new Array<Menu>()
  constructor(private companyService: CompanyService, private headerService: HeaderService) { }

  ngOnInit(): void {
    this.companyService.getAll().subscribe(
      (res: Company) => {
        this.companyDB = res[0];
        //console.log("Company", this.companyDB);
      },
      (err) => {
        console.log("ERROR", err);
      }
    );

    this.headerService.getAll().subscribe(
      (res: Menu[]) => {
        res.forEach(menu => {
          menu.menus = this.getSubmenu(menu, res);
          this.menusDB.push(menu);
        });
        this.updateParentName();
        //console.log("Menus", this.menusDB);
      },
      (err) => {
        console.log("ERROR", err);
      }
    );
  }

  updateParentName(){
    this.menusDB.forEach(menu => {
      if(menu.parent != 0){
        var menuRecord = this.menusDB.filter(m => m.id == menu.parent);
        if(menuRecord.length > 0){
          menu.parentName = menuRecord[0].name;
        }
      }
    });
  }

  getSubmenu(menu: Menu, resouce: Menu[]){
    var submenu = new Array<Menu>();
    resouce.forEach(m => {
      if(m.parent == menu.id){
        m.menus = this.getSubmenu(m, resouce);
        submenu.push(m);
      }
    });
    return submenu;
  }

  onSubmit(f: NgForm) {
    console.log(f.value.email);
    console.log(f.valid);
  }

}
