import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/services/post';
import { PostService } from 'src/app/services/post.service';
import { SERVICES } from './mock-service';

@Component({
  selector: '[app-service]',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  postsDB = new Array<Post>()
  isLoading = true
  services = SERVICES
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getAll().subscribe(
      (res: Post[]) => {
        res.forEach(post => {
            post.title = post.title.length > 20 ? (post.title.substr(0,20) +'..') : (post.title);
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
  }

}
