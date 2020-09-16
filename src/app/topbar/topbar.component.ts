import { Component, OnInit } from '@angular/core';
import { COMPANY } from './mock-company';

@Component({
  selector: '[app-topbar]',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  company = COMPANY
  constructor() { }

  ngOnInit(): void {
  }

}
