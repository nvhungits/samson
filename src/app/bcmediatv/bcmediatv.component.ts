import { Component, OnInit } from '@angular/core';
import { Menu } from '../services/menu';
import { Post } from '../services/post';
import { PostService }  from '../services/post.service';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-bcmediatv',
  templateUrl: './bcmediatv.component.html',
  styleUrls: ['./bcmediatv.component.css']
})
export class BcmediatvComponent implements OnInit {

  postsDB = new Array<Post>()
  constructor(private postService: PostService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.postService.getAll().subscribe(
      (res: Post[]) => {
        res.forEach(post => {
          this.postsDB.push(post);
        });
        //console.log("postsDB", this.postsDB);
      },
      (err) => {
        console.log("ERROR", err);
      }
    );
  }

}
