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
    console.log("--- TOP BAR INIT --- ");
    this.companyService.getAll().subscribe(
      (res: Company) => {
        this.companyDB = res[0];
        console.log("Company", this.companyDB);
      },
      (err) => {
        console.log("ERROR", err);
      }
    );

    console.log("--- HEADER INIT --- ");
    this.headerService.getAll().subscribe(
      (res: Menu[]) => {
        res.forEach(menu => {
          if(menu.parent == 0){
            menu.menus = this.getSubmenu(menu, res);
            this.menusDB.push(menu);
          }
        });
        console.log("Menus", this.menusDB);
      },
      (err) => {
        console.log("ERROR", err);
      }
    );
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
