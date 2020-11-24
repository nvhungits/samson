import { Component, OnInit } from '@angular/core';
import { Menu } from '../../services/menu';
import { HeaderService }  from '../../services/header.service';
import {NgForm} from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { ActivityService } from 'src/app/services/activity.service';
import { Activity } from 'src/app/services/activity';

@Component({
  selector: 'app-module-detail',
  templateUrl: './activity-detail.component.html'
})
export class ActivitySettingsDetailComponent implements OnInit {

  constructor(private activityService: ActivityService, private route: ActivatedRoute) { }

  activitiesDB = new Array<Activity>();
  activityDB: Activity;
  id: string;
  selected: number;
  options: any;
  isLoading = true;
  activityName = "";
  selectedFile: File

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");

    this.activityService.getAll().subscribe(
      (res: Activity[]) => {
        res.forEach(activity => {
          activity.text = activity.title;
          this.activitiesDB.push(activity);
          if(activity.id.toString() == this.id){
            this.activityDB = activity;
            this.activityName = activity.title;
          }
        });
        this.isLoading = false;
        //console.log(this.menusDB, this.id, this.selected);
        this.options = {
          width: '300',
          multiple: false,
          tags: true
        };
      },
      (err) => {
        console.log("ERROR", err);
      }
    );
  }

  onSubmit(f: NgForm) {
    //console.log(this.menuDB);
    //console.log(f.valid);
    //if(f.valid)
    {
      this.activityService.update(this.activityDB).subscribe(
        (res) => {
          alert("Cập nhập");
          location.reload();
        },
        (err) => {
          console.log("ERROR", err);
        }
      );
    }
  }

  public onFileChanged(event, tagContentId:string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];;
      this.selectedFile = file;

      // FileReader support
      if (FileReader && file) {
        var reader = new FileReader();
        reader.readAsDataURL(file); // read file as data url
        reader.onload = (event) => { // called once readAsDataURL is completed
          var imgeLogo = document.getElementById(tagContentId);
          this.activityDB.image = event.target.result.toString();
          imgeLogo.innerHTML = "<img src='" + event.target.result + "' width='150' alt='BCMedia Activity Image' />" ;
        }
      }

    }
  }

}
