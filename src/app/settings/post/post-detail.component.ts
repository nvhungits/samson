import { Component, OnInit } from '@angular/core';
import { Post } from '../../services/post';
import { PostService }  from '../../services/post.service';
import { ActivatedRoute, Router  } from "@angular/router";
import { NgForm } from '@angular/forms'
import { DomSanitizer } from '@angular/platform-browser'

import Quill from 'quill'
import { HeaderService } from 'src/app/services/header.service';
import { Menu } from 'src/app/services/menu';
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
    private headerService: HeaderService,
    private route: ActivatedRoute, 
    private router: Router,
    private sanitizer: DomSanitizer) { }

  postsDB = new Array<Post>();
  menusDB = new Array<Menu>();
  postDB: Post;
  id: string;
  selected: number;
  options: any;
  optionsMenus: any;
  postTitle = "";
  isLoading = true;
  method = "put";
  selectedFile: File;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    if(this.id == "new"){
      this.method = "post";
      this.isLoading = false;
      this.postDB = {
        title: "",video_embed: "",video_url: "",viewers: 0,
        description: "", type: "8",tags: "",created_by: "HN",
        name: "", image: ""
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

    this.headerService.getAll().subscribe(
      (res: Menu[]) => {
        res.forEach(menu => {
          menu.text = menu.name;
          this.menusDB.push(menu);
        });
        this.isLoading = false;
        //console.log(this.menusDB);
        this.optionsMenus = {
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
    if(this.id != "new")
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
    }else{
      //console.log(this.postDB);
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

  //Gets called when the user selects an image
  public onFileChanged(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;
      //console.log(this.selectedFile);

      // FileReader support
      if (FileReader && file) {
        var reader = new FileReader();
        reader.readAsDataURL(file); // read file as data url
        reader.onload = (event) => { // called once readAsDataURL is completed
          var imgeLogo = document.getElementById("presentImage");
          imgeLogo.innerHTML = "<img src='" + event.target.result + "'width='200' alt='BCMedia IMAGE' />" ;
          this.postDB.image =  event.target.result.toString();
        }
      }

    }
  }
}
