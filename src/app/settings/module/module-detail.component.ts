import { Component, OnInit } from '@angular/core';
import { Menu } from '../../services/menu';
import { HeaderService }  from '../../services/header.service';
import {NgForm} from '@angular/forms';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-module-detail',
  templateUrl: './module-detail.component.html'
})
export class ModuleDetailComponent implements OnInit {

  constructor(private headerService: HeaderService, private route: ActivatedRoute) { }

  menusDB = new Array<Menu>();
  menuDB: Menu;
  id: string;
  selected: number;
  options: any;
  isLoading = true;
  menuName = "";

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");

    this.headerService.getAll().subscribe(
      (res: Menu[]) => {
        res.forEach(menu => {
          menu.text = menu.name;
          this.menusDB.push(menu);
          if(menu.id.toString() == this.id){
            this.menuDB = menu;
            this.menuName = menu.name;
            this.selected = menu.parent;
          }
        });
        this.isLoading = false;
        //console.log(this.menusDB, this.id, this.selected);
        this.options = {
          width: '300',
          multiple: false,
          tags: true
        };
      },
      (err) => {
        console.log("ERROR", err);
      }
    );
  }

  onSubmit(f: NgForm) {
    //console.log(this.menuDB);
    //console.log(f.valid);
    //if(f.valid)
    {
      this.headerService.update(this.menuDB).subscribe(
        (res) => {
          alert("Cập nhập");
          location.reload();
        },
        (err) => {
          console.log("ERROR", err);
        }
      );
    }
  }

}
