import { Component, OnInit } from '@angular/core';
import  {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {UserI} from '../../models/user';
import {AlertasService} from '../../services/alertas.service';
import { JwtResponseI } from 'src/app/models/jwt-response';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  errorStatus:boolean = false;
  errorMsj:any ="";
  constructor(private authService: AuthService, private router:Router,private alertService:AlertasService) { }

  ngOnInit(): void {
  }
  onRegister(form: { value: any; }):void{
    this.authService.register(form.value).subscribe(res =>{
      let dataResponse:JwtResponseI = res;
      if(dataResponse.status =="200"){
      //console.log(dataResponse);
      //this.router.navigateByUrl('login');
      this.router.navigateByUrl('/auth/login');
      this.alertService.showSuccess('User created successfully','Done');
      }
      else{
        this.errorStatus = true;
        this.errorMsj = dataResponse.response;
        this.alertService.showError(dataResponse.response,'Error');
      }
    })
  }

}
