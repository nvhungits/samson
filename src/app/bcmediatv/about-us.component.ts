import { Component, OnInit } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { Router } from "@angular/router";
import { Company } from '../services/company';
import { CompanyService } from '../services/company.service';
import { Menu } from '../services/menu';

@Component({
  selector: 'app-bcmediatv',
  templateUrl: './about-us.component.html',
  styleUrls: ['./bcmediatv.component.css']
})
export class AboutUsComponent implements OnInit {

  companyDB: Company
  isLoading = true;
  
  constructor(
    private companyService: CompanyService, 
    private sanitizer: DomSanitizer) {
      
    }


  ngOnInit(): void {
    this.companyService.getAll().subscribe(
      (res: Company) => {
        this.companyDB = res[0];
        this.isLoading = false;
        //console.log("Company", this.companyDB);
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
