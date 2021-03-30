import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import  {Router} from '@angular/router';
import {TextI} from '../../models/text';
import { JwtResponseI } from 'src/app/models/jwt-response';
import {GoogleAnalyzerService} from '../../services/google-analyzer.service';
import {AlertasService} from '../../services/alertas.service';
@Component({
  selector: 'componente-create-text',
  templateUrl: './create-text.component.html',
  styleUrls: ['./create-text.component.css']
})

export class CreateTextComponent implements OnInit {
  textForm = new FormGroup({
    text : new FormControl('',Validators.required)
  })
  errorStatus:boolean = false;
  errorMsj:any ="";
  constructor(private googleAnaliyer: GoogleAnalyzerService,private router:Router, private alertService:AlertasService) { }

  ngOnInit(): void {
  }
  createTextForm(form: { value: any; }):void{
    this.googleAnaliyer.createNewText(form.value).subscribe(res =>{
      let dataResponse:JwtResponseI = res;
      if(dataResponse.status =="200"){
      //console.log(dataResponse);
      this.router.navigateByUrl('dashboard');
      this.alertService.showSuccess('Text created and analyzed successfully','Done');
      }
      else{
        this.errorStatus = true;
        this.errorMsj = dataResponse.response;
        this.alertService.showError(dataResponse.response,'Error');
      }
      
    })
    //console.log('Login', form.value)
  }

}


