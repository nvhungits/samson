import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../services/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: '[app-post]',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  postsDB = new Array<Post>();
  isLoading = true;
  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.postService.getAll().subscribe(
      (res: Post[]) => {
        res.forEach(post => {
          this.postsDB.push(post);
        });
        this.isLoading = false;
        //console.log("postsDB", this.postsDB);
      },
      (err) => {
        console.log("ERROR", err);
      }
    );
  }

  btnDelete(id: string){
    var flag = confirm("Bạn muốn xóa bài viết này?");
    if(flag){
      this.postService.delete(id).subscribe(
        (res: any) => {
          this.isLoading = false;
          alert("Xóa thành công");
          location.reload();
        },
        (err) => {
          console.log("ERROR", err);
        }
      );
    }
  }

}
