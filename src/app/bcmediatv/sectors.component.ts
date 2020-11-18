import { Component, OnInit } from '@angular/core';
import { Post } from '../services/post';
import { PostService }  from '../services/post.service';
import { DomSanitizer} from '@angular/platform-browser';
import { HeaderService } from '../services/header.service';
import { Menu } from '../services/menu';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-bcmediatv',
  templateUrl: './bcmediatv.component.html',
  styleUrls: ['./bcmediatv.component.css']
})
export class SectorsComponent implements OnInit {

  postsDB = new Array<Post>()
  menusDB = new Array<Menu>()
  isLoading = true;
  typeId = "3";//Lĩnh Vực
  childId: string

  constructor(
    private postService: PostService, 
    private sanitizer: DomSanitizer,
    private headerService: HeaderService,
    private route: ActivatedRoute,
    private router: Router) { 
      this.router.routeReuseStrategy.shouldReuseRoute = function(){
        return false;
      }
      this.router.events.subscribe((evt) => {
        if (evt instanceof NavigationEnd) {
           // trick the Router into believing it's last link wasn't previously loaded
           this.router.navigated = false;
           // if you need to scroll back to top, here is the right place
           window.scrollTo(0, 0);
        }
      });
    }

  ngOnInit(): void {
    this.childId = this.route.snapshot.paramMap.get("child_id");
    if(this.childId){
      this.typeId = this.childId;
    }

    this.headerService.getAll().subscribe(
      (res: Menu[]) => {
        res.forEach(menu => {
          if(menu.id.toString() == this.typeId){
            menu.menus = this.getSubmenu(menu, res);
            this.menusDB.push(menu);
          }
        });
        //console.log(this.getNameMenuById(3));
        //console.log("Menus", this.menusDB);

        this.postService.getAll().subscribe(
          (res: Post[]) => {
            res.forEach(post => {
              post.description = post.description.length > 200 ? (post.description.substr(0,200) +'..') : (post.description);
              if(post.type == this.typeId){
                this.postsDB.push(post);
              }else{
                this.hasInSubmenu(this.menusDB, post);
              }
            });
            this.isLoading = false;
            //console.log("postsDB", this.postsDB, res);
          },
          (err) => {
            console.log("ERROR", err);
          }
        );
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

  hasInSubmenu(resouce: Menu[], post: Post){
    if(resouce.length == 0)
      return;
    resouce.forEach(m => {
      //console.log("ID", m.parent);
      if(m.id.toString() == post.type){
        this.postsDB.push(post);
      }
      else{
        this.hasInSubmenu(m.menus, post);
      }
    });
  }
}
