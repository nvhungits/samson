import { Component, OnInit } from '@angular/core';
import { Post } from '../../services/post';
import { PostService }  from '../../services/post.service';
import {NgForm} from '@angular/forms';
import { ActivatedRoute, Router  } from "@angular/router";

@Component({
  selector: 'app-module-detail',
  templateUrl: './post-detail.component.html'
})
export class PostDetailComponent implements OnInit {

  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router) { }

  postsDB = new Array<Post>();
  postDB: Post;
  id: string;
  selected: number;
  options: any;
  postTitle = "";
  isLoading = true;
  method = "put";

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    if(this.id == "new"){
      this.method = "post";
      this.isLoading = false;
      this.postDB = {
        title: "",
        video_embed: "",
        video_url: "",
        viewers: 0,
        description: "",
        type: "bcmediaTV",
        tags: "",
        created_by: "HN"
      }
    }
    else{
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
          //console.log(this.postsDB, this.id, this.postDB);
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
  }

  onSubmit(f: NgForm) {
    //console.log(this.menuDB);
    //console.log(f.valid);

    if(this.id != "new")
    {
      this.postService.update(this.postDB).subscribe(
        (res) => {
          console.log(res);
          alert("Cập nhập");
          location.reload();
        },
        (err) => {
          console.log("ERROR", err);
        }
      );
    }else{
      this.postService.create(this.postDB).subscribe(
        (res) => {
          console.log(res);
          alert("Tạo thành công");
          this.router.navigate(['/settings']);
        },
        (err) => {
          console.log("ERROR", err);
        }
      );
    }
  }

}
