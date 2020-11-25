import { Component, OnInit } from '@angular/core';
import { COMPANY } from './mock-company';
import { CompanyService } from '../services/company.service';
import { Company } from '../services/company';

@Component({
  selector: '[app-topbar]',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  company = COMPANY
  companyDB: Company
  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.companyService.getAll().subscribe(
      (res: Company) => {
        this.companyDB = res[0];
      },
      (err) => {
        console.log("ERROR", err);
      }
    );
  }

  ngAfterViewInit(){
  }

}
