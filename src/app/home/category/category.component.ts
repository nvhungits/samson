import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/services/header.service';
import { Menu } from 'src/app/services/menu';
import { Post } from 'src/app/services/post';
import { PostService } from 'src/app/services/post.service';
import { CATEGORIES } from './mock-category';

@Component({
  selector: '[app-category]',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories = CATEGORIES;
  constructor(private headerService: HeaderService, 
    private route: Router,
    private postService: PostService) { }

  menusDB = new Array<Menu>();
  postsDB = new Array<Post>();
  postsDBByMenus = new Array<Post>();
  isLoading = true;
  ngOnInit(): void {

    this.headerService.getAll().subscribe(
      (res: Menu[]) => {
        res.forEach(menu => {
          if(menu.parent == 3){//Lĩnh Vực
            menu.title = menu.name;
            menu.image = "";
            menu.description = "";
            menu.bottom = true;
            menu.menus = this.getSubmenu(menu, res);
            menu.posts = new Array<Post>();
            this.menusDB.push(menu);
          }
        });
        this.updateParentName();
        
        this.postService.getAll().subscribe(
          (res: Post[]) => {
            res.forEach(post => {
                post.title = post.title.length > 20 ? (post.title.substr(0,20) +'..') : (post.title);
                post.description = post.description.length > 400 ? (post.description.substr(0,400) +'..') : (post.description);
                this.postsDB.push(post);
                this.menusDB.forEach(menu => {
                    if(menu.id.toString() == post.type || this.childInSubMenu(menu, post)){
                      //console.log("Post", post);
                      menu.posts.push(post);
                    }
                });
            });
            this.isLoading = false;
            //console.log("postsDB", this.postsDB, res);
          },
          (err) => {
            console.log("ERROR", err);
          }
        );

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

  childInSubMenu(menu: Menu, post: Post){
    //console.log(menu.menus, post.type);
    if(!menu.menus || menu.menus.length == 0)
      return false;
    menu.menus.forEach(m => {
      if(m.id.toString() == post.type || this.childInSubMenu(m, post)){
        menu.posts.push(post);
        return true;
      }
    });
    return false;
  }

  getNameMenuById(Id: number){
    var menus = this.menusDB.filter(x => x.id == Id);
    return menus[0] ? menus[0].name : "";
  }

}
