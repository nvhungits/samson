import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { Company } from '../../services/company';
import { CompanyService } from '../../services/company.service';
import { FileService } from '../../services/file.service';

@Component({
  selector: '[app-company-info]',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent implements OnInit {

  companyDB: Company
  isLoading = true;
  selectedFile: File;
  logoURL = "https://bcmedia.vn/uploads/images/LOGO.jpg";
  BannerURL = "https://bcmedia.vn/uploads/images/BANNER.jpg";
  BGURL = "https://bcmedia.vn/uploads/images/BACKGROUND.jpg";

  constructor(
    private companyService: CompanyService, 
    private fileService: FileService) { 

  }
 

  ngOnInit(): void {
    this.companyService.getAll().subscribe(
      (res: Company) => {
        this.companyDB = res[0];
        this.companyDB.background_image = res[0].background_image === "1" ? true : false;
        this.isLoading = false;
        //console.log("Company", this.companyDB, res);
      },
      (err) => {
        console.log("ERROR", err);
      }
    );
  }

  public onSubmit(f: Form){
    //console.log(this.companyDB, f);
    this.companyService.update(this.companyDB).subscribe(
      (res: any) => {
        alert("Cập nhập thành công");
        console.log(res);
      },
      (err) => {
        alert("Cập nhập không thành công. " + err.message);
        console.log("ERROR", err);
      }
    );
  } 

  //Gets called when the user selects an image
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
          if(tagContentId == "logoUrlSetting"){
            imgeLogo.innerHTML = "<img src='" + event.target.result + "' width='100' alt='BCMedia LOGO' />" ;
          }
          else{
            imgeLogo.innerHTML = "<img src='" + event.target.result + "' style='max-height: 300px;' class='img-responsive' alt='BCMedia " + tagContentId + "' />" ;
          }
        }
      }

    }
  }

  //Gets called when the user clicks on submit to upload the image
  onUpload(fileName:string) {
    if(this.selectedFile == null){
      alert("Chưa chọn file");
      return;
    }
    const formData = new FormData();

    formData.append('fileToUpload', this.selectedFile, fileName);

    this.fileService.upload(formData).subscribe(
      (res) => {
        alert("Cập nhập");
        location.reload();
        //console.log(res);
      },
      (err) => {  
        console.log(err);
      }
    );
  }
}
