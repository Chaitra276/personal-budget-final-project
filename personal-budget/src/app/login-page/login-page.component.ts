import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import {GlobalConstants} from '../app.global';

@Component({
  selector: 'pb-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public userData = [];
  username:string
  password:string
  isUserLoggedIn = new Subject<boolean>();

  constructor(private router: Router,public _dataService: DataService,public toastr:ToastrService) {
    this.isUserLoggedIn.next(false);
   }

  ngOnInit(): void {
  }

  signupFunction(){
    this.router.navigate(['/signup'])
  }


  enterAllDetails(){
    window.alert('Please enter all the details');
    console.log("in");
  }
  loginSuccessful(){
    window.alert('Logged In');
  }

  loginFailure(){
    window.alert('Invalid Credentials. Please enter valid credentials');
  }
  loginFunction(){
    let record = {};
    record['username'] = this.username;
    record['password'] = this.password;
    console.log(JSON.stringify(record));

    if(!this.username || !this.password){
      this.enterAllDetails();
      console.log("UserName or password is missing");
    }else{
      this._dataService.userLogin(record);
    }
  }

}
