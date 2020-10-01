import { Component, OnInit } from '@angular/core';4
import { MENUS } from './menu/mockMenu';
import { Menu } from '../services/menu';
import { HeaderService }  from '../services/header.service';

@Component({
  selector: '[app-header]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menus = MENUS
  menusDB = new Array<Menu>()
  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.getAll().subscribe(
      (res: Menu[]) => {
        res.forEach(menu => {
          if(menu.parent == 0){
            menu.menus = this.getSubmenu(menu, res);
            this.menusDB.push(menu);
          }
        });
        //console.log("Menus", this.menusDB);
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

}
