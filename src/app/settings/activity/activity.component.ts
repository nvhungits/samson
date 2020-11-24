import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Activity } from 'src/app/services/activity';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: '[app-activity-setting]',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivitySettingsComponent implements OnInit {

  constructor(private activityService: ActivityService, private route: Router) { }

  dtOptions: DataTables.Settings = {};
  activitiesDB = new Array<Activity>();
  isLoading = true;
  
  ngOnInit(): void {
    this.activityService.getAll().subscribe(
      (res: Activity[]) => {
        res.forEach(activityRes => {
          this.activitiesDB.push(activityRes);
        });
        this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 5,
          lengthMenu : [5, 10, 25],
          processing: true
        };
        this.isLoading = false;
        //console.log("Activities", this.activitiesDB);
      },
      (err) => {
        console.log("ERROR", err);
      }
    );
  }
}
