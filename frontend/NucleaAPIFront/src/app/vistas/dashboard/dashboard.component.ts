import { Component, OnInit } from '@angular/core';
import {ApiTextService} from '../../services/api-text.service';
import  {Router} from '@angular/router';
import {TextI} from '../../models/text';
import { JwtResponseI } from 'src/app/models/jwt-response';
import {AlertasService} from '../../services/alertas.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  listText: TextI[] | undefined ;
  feelingAverage:number;
  percentage:number;
  errorStatus:boolean = false;
  errorMsj:any ="";
  constructor(private apiText: ApiTextService,private router:Router,private alertService: AlertasService) { 
    this.feelingAverage =0;
    this.percentage =0;
  }
  
  ngOnInit(): void {
    if(!localStorage.getItem('auth-token')){
      this.router.navigateByUrl('/auth/login');
    }
    else{
      this.apiText.getListText().subscribe(data =>{
        this.listText = data;
        let sumScore=0;
        for(let text of this.listText){
          sumScore = text.score +sumScore;
        }
        this.feelingAverage = sumScore/this.listText.length;
        //this.feelingAverage =-0.5;
        if(this.feelingAverage >=0){
          this.percentage =this.feelingAverage*100/1;
        }
        else{
          this.percentage =this.feelingAverage*100/-1;
        }
        
  
        console.log(this.feelingAverage);
        console.log(data);
      });
    }
    
  }
  deleteText(id: string){
    this.apiText.deleteTextById(id).subscribe(res =>{
      let dataResponse:JwtResponseI = res;
      console.log(dataResponse);
      if(dataResponse.status =="200"){
      //console.log(dataResponse);
        window.location.reload();
        this.alertService.showSuccess('Text eliminated successfully','Done');
      }
      else{
        this.errorStatus = true;
        this.errorMsj = dataResponse.response;
        this.alertService.showError(dataResponse.response,'Error');
      }
    });

  }
  orderByAScore(){
    this.apiText.textListByAScore().subscribe(data =>{
      this.listText = data;
      let sumScore=0;
      for(let text of this.listText){
        sumScore = text.score +sumScore;
      }
      this.feelingAverage = sumScore/this.listText.length;
      //this.feelingAverage =-0.5;
      if(this.feelingAverage >=0){
        this.percentage =this.feelingAverage*100/1;
      }
      else{
        this.percentage =this.feelingAverage*100/-1;
      }
      

      console.log(this.feelingAverage);
      console.log(data);
    });

  }
  orderByDScore(){
    this.apiText.textListByDScore().subscribe(data =>{
      this.listText = data;
      let sumScore=0;
      for(let text of this.listText){
        sumScore = text.score +sumScore;
      }
      this.feelingAverage = sumScore/this.listText.length;
      //this.feelingAverage =-0.5;
      if(this.feelingAverage >=0){
        this.percentage =this.feelingAverage*100/1;
      }
      else{
        this.percentage =this.feelingAverage*100/-1;
      }
      

      console.log(this.feelingAverage);
      console.log(data);
    });

  }
  orderByADate(){
    this.apiText.textListByADate().subscribe(data =>{
      this.listText = data;
      let sumScore=0;
      for(let text of this.listText){
        sumScore = text.score +sumScore;
      }
      this.feelingAverage = sumScore/this.listText.length;
      //this.feelingAverage =-0.5;
      if(this.feelingAverage >=0){
        this.percentage =this.feelingAverage*100/1;
      }
      else{
        this.percentage =this.feelingAverage*100/-1;
      }
      

      console.log(this.feelingAverage);
      console.log(data);
    });

  }
  orderByDDate(){
    this.apiText.textListByDDate().subscribe(data =>{
      this.listText = data;
      let sumScore=0;
      for(let text of this.listText){
        sumScore = text.score +sumScore;
      }
      this.feelingAverage = sumScore/this.listText.length;
      //this.feelingAverage =-0.5;
      if(this.feelingAverage >=0){
        this.percentage =this.feelingAverage*100/1;
      }
      else{
        this.percentage =this.feelingAverage*100/-1;
      }
      

      console.log(this.feelingAverage);
      console.log(data);
    });

  }

}
