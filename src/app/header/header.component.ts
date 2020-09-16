import { Component, OnInit } from '@angular/core';4
import { MENUS } from './menu/mockMenu';

@Component({
  selector: '[app-header]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menus = MENUS
  constructor() { }

  ngOnInit(): void {
  }

}
