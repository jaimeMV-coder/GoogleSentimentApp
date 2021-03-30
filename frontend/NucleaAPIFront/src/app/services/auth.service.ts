import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserI} from '../models/user';
import {JwtResponseI} from '../models/jwt-response';
import {tap} from 'rxjs/operators';
import {Observable,BehaviorSubject, pipe} from 'rxjs';

@Injectable()
export class AuthService {
AUTH_SERVER: string = '/api/user';
authSubject = new BehaviorSubject(false);
private token: string;
  constructor(private httpClient:HttpClient) {
    this.token ="";
   }

  register(user:UserI):Observable<JwtResponseI>{
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/register`,
    user).pipe(tap(
      (res:JwtResponseI)=>{
        if(res){
          
          //Guardar Token
          //this.saveToken(res.response);
        }
      })
    );
    
  }

  login(user:UserI):Observable<JwtResponseI>{
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/login`,
    user).pipe(tap(
      (res:JwtResponseI)=>{
        return res;
      })
    );
    
  }

  logout():void{
    this.token = '';
    localStorage.removeItem("auth-token");
  }

  private saveToken(token:string):void{
    localStorage.setItem("auth-token",token);
    this.token = token;
  }
  private getToken():string | void{
    if(!this.token){
      this.token = JSON.parse(localStorage.getItem('auth-token') || '{}');
    }
    return this.token;
  }
}
