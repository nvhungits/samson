import { Component, OnInit } from '@angular/core';
import { CATEGORIES } from './mock-category';

@Component({
  selector: '[app-category]',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories = CATEGORIES;
  constructor() { }

  ngOnInit(): void {
  }

}
