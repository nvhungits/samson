import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o/lib/models/owl-options.model';
import { HeaderService } from '../services/header.service';
import { Menu } from '../services/menu';
import { Post } from '../services/post';
import { PostService } from '../services/post.service';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  menusDB = new Array<Menu>()
  postsDB = new Array<Post>()
  isLoading = true
  customOptions: OwlOptions = {
    nav: true,
    navText: [ 'Bài Trước', 'Bài Sau' ],
    loop: true,
    items: 1,
    autoplay: true,
    autoplayTimeout: 5000,
    dots: false
  }
  constructor(private postService: PostService, 
    private headerService: HeaderService, 
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.headerService.getAll().subscribe(
      (res: Menu[]) => {
        res.forEach(menu => {
          this.menusDB.push(menu);
        });
        this.isLoading = false;
        //console.log(this.getNameMenuById(3));
        //console.log("Menus", this.menusDB);
        this.postService.getAll().subscribe(
          (res: Post[]) => {
            res.forEach(post => {
                post.title = post.title.length > 20 ? (post.title.substr(0,20) +'..') : (post.title);
                post.type = this.getNameMenuById(post.type);
                post.description = post.description.length > 400 ? (post.description.substr(0,400) +'..') : (post.description);
                this.postsDB.push(post);
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

  getNameMenuById(Id: string){
    var menus = this.menusDB.filter(x => x.id.toString() == Id);
    return menus[0] ? menus[0].name : "";
  }

}
