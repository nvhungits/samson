import { Component, OnInit } from '@angular/core';
import { Post } from '../../services/post';
import { PostService }  from '../../services/post.service';
import {NgForm} from '@angular/forms';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-module-detail',
  templateUrl: './post-detail.component.html'
})
export class PostDetailComponent implements OnInit {

  constructor(private postService: PostService, private route: ActivatedRoute) { }

  postsDB = new Array<Post>();
  postDB: Post;
  id: string;
  selected: number;
  options: any;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");

    this.postService.getAll().subscribe(
      (res: Post[]) => {
        res.forEach(post => {
          this.postsDB.push(post);
          if(post.id.toString() == this.id){
            this.postDB = post;
          }
        });
        console.log(this.postsDB, this.id, this.postDB);
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
      this.postService.update(this.postDB).subscribe(
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
