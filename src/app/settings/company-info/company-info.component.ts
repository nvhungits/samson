import { Component, OnInit } from '@angular/core';
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
  constructor(private companyService: CompanyService, 
    private fileService: FileService) { }

  selectedFile: File;

  ngOnInit(): void {
    this.companyService.getAll().subscribe(
      (res: Company) => {
        this.companyDB = res[0];
        this.isLoading = false;
        //console.log("Company", this.companyDB);
      },
      (err) => {
        console.log("ERROR", err);
      }
    );
  }

  //Gets called when the user selects an image
  public onFileChanged(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;
      //console.log(this.selectedFile);
    }
  }

  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    const formData = new FormData();

    let fileName:string = 'LOGO.jpg' //get name from form for example
    //let fileExtension:string = this.selectedFile.name.split('?')[0].split('.').pop();

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
