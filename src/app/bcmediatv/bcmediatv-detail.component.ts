import { Component, OnInit } from '@angular/core';
import { Post } from '../services/post';
import { PostService }  from '../services/post.service';
import { DomSanitizer} from '@angular/platform-browser';
import { ActivatedRoute } from "@angular/router";
import { PostTypeENUM } from './postTypeENUM';

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
  parentLink: string;

  constructor(private postService: PostService, private sanitizer: DomSanitizer, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");

    this.postService.getAll().subscribe(
      (res: Post[]) => {
        res.forEach(post => {
          this.postsDB.push(post);
          if(post.id.toString() == this.id){
            this.postDB = post;
            this.postTitle = post.name;
            this.parentLink = PostTypeENUM[post.type];
          }
        });
        this.isLoading = false;
        //console.log("postsDB", this.postsDB, this.postDB, this.parentLink);
      },
      (err) => {
        console.log("ERROR", err);
      }
    );
  }

  byPassHTML(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html)
  }
  

}
