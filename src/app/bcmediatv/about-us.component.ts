import { Component, OnInit } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { Router } from "@angular/router";
import { Company } from '../services/company';
import { CompanyService } from '../services/company.service';
import { Post } from '../services/post';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-bcmediatv',
  templateUrl: './about-us.component.html',
  styleUrls: ['./bcmediatv.component.css']
})
export class AboutUsComponent implements OnInit {

  companyDB: Company
  isLoading = true;
  typeId = "1000";
  postDB: Post

  constructor(
    private companyService: CompanyService, 
    private sanitizer: DomSanitizer,
    private postService: PostService) {
      
    }


  ngOnInit(): void {
    this.companyService.getAll().subscribe(
      (res: Company) => {
        this.companyDB = res[0];
        //console.log("Company", this.companyDB);
      },
      (err) => {
        console.log("ERROR", err);
      }
    );

    this.postService.getAll().subscribe(
      (res: Post[]) => {
        res.forEach(post => {
          if(post.type == this.typeId){
            this.postDB = post;
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

  byPassHTML(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html)
  }

  
}
