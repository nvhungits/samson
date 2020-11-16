import { Component, OnInit } from '@angular/core';
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
  isLoading = true;
  typeId = "8";//TV Show

  constructor(private postService: PostService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.postService.getAll().subscribe(
      (res: Post[]) => {
        res.forEach(post => {
          if(post.type == this.typeId){
            post.description = post.description.length > 200 ? (post.description.substr(0,200) +'..') : (post.description);
            this.postsDB.push(post);
          }
        });
        this.isLoading = false;
        //console.log("postsDB", this.postsDB);
      },
      (err) => {
        console.log("ERROR", err);
      }
    );
  }

  isVideo(url: string){
    if(url && url != ""){
      if(url.toString().indexOf("embed") > -1)
        return true;
    }
    return false;
  }

}
