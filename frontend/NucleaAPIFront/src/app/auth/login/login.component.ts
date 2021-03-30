import { Component, OnInit } from '@angular/core';
import  {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {UserI} from '../../models/user';
import {FormGroup,FormControl,Validators} from '@angular/forms'
import { JwtResponseI } from 'src/app/models/jwt-response';
import {AlertasService} from '../../services/alertas.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required)
  })
  constructor(private authService: AuthService, private router:Router,private alertServices:AlertasService) { }
  errorStatus:boolean = false;
  errorMsj:any ="";
  ngOnInit(): void {
    this.getLocalStorage();
  }
  getLocalStorage(){
    if(localStorage.getItem('auth-token')){
      this.router.navigate(['dashboard']);
    }
  }

  onLogin(form: { value: any; }):void{
    this.authService.login(form.value).subscribe(res =>{
      let dataResponse:JwtResponseI = res;
      if(dataResponse.status =="200"){
        localStorage.setItem("auth-token",dataResponse.response);
      //console.log(dataResponse);
      this.router.navigateByUrl('dashboard');
      
      this.alertServices.showSuccess('Welcome','Done');
      }
      else{
        this.errorStatus = true;
        this.errorMsj = dataResponse.response;
        
        this.alertServices.showError(dataResponse.response,'Error');
      }
      
    })
    //console.log('Login', form.value)
  }

}
