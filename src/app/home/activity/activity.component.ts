import { Component, OnInit } from '@angular/core';
import { ACTIVITIES } from './mock-activity';

@Component({
  selector: '[app-activity]',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  activities = ACTIVITIES
  constructor() { }

  ngOnInit(): void {
  }

}
