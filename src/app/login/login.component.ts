import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[app-login]',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  password: string;
  messageStatus: string;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if(this.password == 'Bcmedia.vn@123'){
      localStorage.setItem('token_account', 'nbcuong-Bcmedia.vn@123');
      localStorage.setItem('islogin', "true");
      this.messageStatus = "Đăng nhập thành công";

      var date = new Date();
      var nextTime = date.getMinutes() + 14320;
      var nextDate = new Date();
      nextDate.setMinutes(nextTime);

      var Enobject = {value: "value", timestamp: nextDate.getTime()};
      localStorage.setItem('token_time', JSON.stringify(Enobject));

      window.location.reload();
    }else{
      this.messageStatus = "Sai mật khẩu";
    }
  }
}
