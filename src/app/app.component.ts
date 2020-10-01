import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Xuôi ngược sông mã';
  isLoggedIn = false;

  constructor() { }

  ngOnInit(): void {
    


    var token = localStorage.getItem('token_account');
    var login = localStorage.getItem('islogin');
    var time = localStorage.getItem('token_time');

    if(time != null){
      var Deobject = JSON.parse(time),
        expireTime = Deobject.timestamp,
        now = new Date().getTime().toString();

      if(now >= expireTime){
        token = "";
        login = "false";
        localStorage.setItem('token_account', token);
        localStorage.setItem('islogin', login);
      }

      if(token == "nbcuong-Bcmedia.vn@123" && login == "true"){
        this.isLoggedIn = true;
      }
    }
  }

}