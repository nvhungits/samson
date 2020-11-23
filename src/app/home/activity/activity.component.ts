import { Component, OnInit } from '@angular/core';
import { ACTIVITIES } from './mock-activity';
import { ActivityService } from '../../services/activity.service';
import { Activity } from 'src/app/services/activity';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: '[app-activity]',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  activities = ACTIVITIES
  activitiesDB = new Array<Activity>()
  isLoading = true
  customOptions: OwlOptions = {
    nav: true,
    navText: [ 'Bài Trước', 'Bài Sau' ],
    loop: true,
    items: 3,
    autoplay: true,
    autoplayTimeout: 5000,
    dots: false
  }

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    this.activityService.getAll().subscribe(
      (res: Activity[]) => {
        res.forEach(activitiy => {
            activitiy.title = activitiy.title.length > 20 ? (activitiy.title.substr(0,20) +'..') : (activitiy.title);
            activitiy.description = activitiy.description.length > 400 ? 
              (activitiy.description.substr(0,400) +'..') : (activitiy.description);
            this.activitiesDB.push(activitiy);
        });
        this.isLoading = false;
        console.log("DB", this.activitiesDB, res);
      },
      (err) => {
        console.log("ERROR", err);
      }
    );
  }

}
