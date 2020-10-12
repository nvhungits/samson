import { Component, OnInit } from '@angular/core';
import { Menu } from '../services/menu';
import { Post } from '../services/post';
import { PostService }  from '../services/post.service';
import { DomSanitizer} from '@angular/platform-browser';
import {NgForm} from '@angular/forms';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-bcmediatv',
  templateUrl: './bcmediatv-detail.component.html',
  styleUrls: ['./bcmediatv.component.css']
})
export class BcmediatvDetailComponent implements OnInit {

  postsDB = new Array<Post>()
  postDB: Post;
  isLoading = true;
  postTitle = "";
  id: string;

  constructor(private postService: PostService, private sanitizer: DomSanitizer, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");

    this.postService.getAll().subscribe(
      (res: Post[]) => {
        res.forEach(post => {
          this.postsDB.push(post);
          if(post.id.toString() == this.id){
            this.postDB = post;
            this.postTitle = post.title;
          }
        });
        this.isLoading = false;
        //console.log("postsDB", this.postsDB, this.postDB);
      },
      (err) => {
        console.log("ERROR", err);
      }
    );
  }

}
