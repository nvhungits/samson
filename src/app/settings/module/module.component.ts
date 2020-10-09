import { Component, OnInit } from '@angular/core';
import { Menu } from '../../services/menu';
import { HeaderService }  from '../../services/header.service';
import { Router} from '@angular/router';

@Component({
  selector: '[app-module]',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {

  constructor(private headerService: HeaderService, private route: Router) { }
  dtOptions: DataTables.Settings = {};

  menusDB = new Array<Menu>();
  ngOnInit(): void {

    this.headerService.getAll().subscribe(
      (res: Menu[]) => {
        res.forEach(menu => {
          menu.menus = this.getSubmenu(menu, res);
          this.menusDB.push(menu);
        });
        this.updateParentName();
        this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 5,
          lengthMenu : [5, 10, 25],
          processing: true
        };
        //console.log(this.getNameMenuById(3));
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

  getNameMenuById(Id: number){
    var menus = this.menusDB.filter(x => x.id == Id);
    return menus[0] ? menus[0].name : "";
  }

}
