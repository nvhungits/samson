import { Component, OnInit } from '@angular/core';
import { Company } from '../../services/company';
import { CompanyService } from '../../services/company.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: '[app-company-info]',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent implements OnInit {

  companyDB: Company
  constructor(private companyService: CompanyService) { }

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
  }

  onSubmit(f: NgForm) {
    console.log(f.value.email);
    console.log(f.valid);
  }

}
