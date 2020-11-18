import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/services/header.service';
import { Menu } from 'src/app/services/menu';
import { Post } from 'src/app/services/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: '[app-side-bar]',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  menusDB = new Array<Menu>()
  subUrl: string
  isLoading = true
  
  constructor(
    private postService: PostService, 
    private headerService: HeaderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subUrl = this.router.url.replace("/","");
    this.getMenus();
  }

  getMenus(){
    this.headerService.getAll().subscribe(
      (res: Menu[]) => {
        res.forEach(menu => {
          if(menu.parent == 0){
            menu.menus = this.getSubmenu(menu, res);
            menu.posts = new Array<Post>();
            this.menusDB.push(menu);
          }
        });
        this.postService.getAll().subscribe(
          (res: Post[]) => {
            res.forEach(post => {
              this.menusDB.forEach(m =>{
                if(m.id.toString() == post.type){
                  m.posts.push(post);
                }
              });              
            });
            this.isLoading = false;
          },
          (err) => {
            console.log("ERROR", err);
          }
        );
        //console.log("Menus", this.menusDB);
      },
      (err) => {
        console.log("ERROR", err);
      }
    );
  }

  getMenuWithCurrentUrl(){
    return this.menusDB.filter(m => m.url === this.subUrl);
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
