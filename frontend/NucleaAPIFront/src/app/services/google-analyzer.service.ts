import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {JwtResponseI} from '../models/jwt-response';
import {tap} from 'rxjs/operators';
import {Observable,BehaviorSubject, pipe} from 'rxjs';
@Injectable()
export class GoogleAnalyzerService {
  AUTH_SERVER: string = '/api/googletext';
  authSubject = new BehaviorSubject(false);
  private authtoken: any;
  constructor(private httpClient:HttpClient) {
    this.authtoken =localStorage.getItem('auth-token');
   }
   createNewText(text:string):Observable<JwtResponseI>{
    let httpHeaders = new HttpHeaders({
      'Content-Type':  'application/json',
      'auth-token': ''
    });
    httpHeaders = httpHeaders.set('auth-token',localStorage.getItem('auth-token') || '{}');
    this.authtoken = localStorage.getItem('auth-token');
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/consultText`,
    text,{headers:httpHeaders}).pipe(tap(
      (res:JwtResponseI)=>{
        if(res){
          //Guardar Token
          console.log(res);
        }
      })
    );
    
  }
}
