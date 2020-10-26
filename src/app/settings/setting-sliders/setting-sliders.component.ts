import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-setting-sliders',
  templateUrl: './setting-sliders.component.html',
  styleUrls: ['./setting-sliders.component.css']
})
export class SettingSlidersComponent implements OnInit {

  isLoading = false;
  constructor(private fileService: FileService) { }
  selectedFileSlider1: File;
  selectedFileSlider2: File;
  selectedFileSlider3: File;
  selectedFileSlider4: File;
  slider1 = "https://bcmedia.vn/uploads/images/SLIDER1.jpg";
  slider2 = "https://bcmedia.vn/uploads/images/SLIDER2.jpg";
  slider3 = "https://bcmedia.vn/uploads/images/SLIDER3.jpg";
  slider4 = "https://bcmedia.vn/uploads/images/SLIDER4.jpg";

  ngOnInit(): void {
  }

  //Gets called when the user selects an image
  public onFileChanged(event, id) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      if(id == 'slider1')
        this.selectedFileSlider1 = file;
      if(id == 'slider2')
        this.selectedFileSlider2 = file;
      if(id == 'slider3')
        this.selectedFileSlider3 = file;
      if(id == 'slider4')
        this.selectedFileSlider4 = file;

      // FileReader support
      if (FileReader && file) {
        var reader = new FileReader();
        reader.readAsDataURL(file); // read file as data url
        reader.onload = (event) => { // called once readAsDataURL is completed
          var slider = document.getElementById(id);
          slider.innerHTML = "<img src='" + event.target.result + "'width='400' alt='Slider' />" ;
        }
      }

    }
  }

  //Gets called when the user clicks on submit to upload the image
  onUpload(id) {
    const formData = new FormData();
    let fileName:string = id + '.jpg';

    if(id == 'SLIDER1')
      formData.append('fileToUpload', this.selectedFileSlider1, fileName);
    if(id == 'SLIDER2')
      formData.append('fileToUpload', this.selectedFileSlider2, fileName);
    if(id == 'SLIDER3')
      formData.append('fileToUpload', this.selectedFileSlider3, fileName);
    if(id == 'SLIDER4')
      formData.append('fileToUpload', this.selectedFileSlider4, fileName);
    

    this.fileService.upload(formData).subscribe(
      (res) => {
        alert("Cập nhập");
        //location.reload();
        //console.log(res);
      },
      (err) => {  
        console.log(err);
      }
    );
  }

}
