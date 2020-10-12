import { Component, OnInit } from '@angular/core';
import { Post } from '../../services/post';
import { PostService }  from '../../services/post.service';
import { ActivatedRoute, Router  } from "@angular/router";
import { NgForm } from '@angular/forms'
import { DomSanitizer } from '@angular/platform-browser'

import Quill from 'quill'
const parchment = Quill.import('parchment')
const block = parchment.query('block')
block.tagName = 'DIV'
// or class NewBlock extends Block {} NewBlock.tagName = 'DIV'
Quill.register(block /* or NewBlock */, true)

@Component({
  selector: 'app-module-detail',
  templateUrl: './post-detail.component.html'
})
export class PostDetailComponent implements OnInit {

  constructor(
    private postService: PostService, 
    private route: ActivatedRoute, 
    private router: Router,
    private sanitizer: DomSanitizer) { }

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
        title: "",video_embed: "",video_url: "",viewers: 0,
        description: "", type: "bcmediaTV",tags: "",created_by: "HN"
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
          //console.log(res, this.postDB);
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

  byPassHTML(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html)
  }
}
