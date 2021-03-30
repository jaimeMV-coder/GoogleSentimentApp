import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import {TextI} from '../models/text';
import {JwtResponseI} from '../models/jwt-response';
import {tap} from 'rxjs/operators';
import {Observable,BehaviorSubject, pipe} from 'rxjs';

@Injectable()
export class ApiTextService {
  AUTH_SERVER: string = '/api/text';
  authSubject = new BehaviorSubject(false);
  private authtoken: any;
  constructor(private httpClient:HttpClient) {
    this.authtoken =localStorage.getItem('auth-token');
   }

  getListText():Observable<TextI[]>{
    let httpHeaders = new HttpHeaders({
      'Content-Type':  'application/json',
      'auth-token': ''
    });
    httpHeaders = httpHeaders.set('auth-token',localStorage.getItem('auth-token') || '{}');
    this.authtoken = localStorage.getItem('auth-token');
    return this.httpClient.get<TextI[]>(`${this.AUTH_SERVER}/listText/`,{headers:httpHeaders});
  }
  deleteTextById(id:string):Observable<JwtResponseI>{
    let httpHeaders = new HttpHeaders({
      'Content-Type':  'application/json',
      'auth-token': ''
    });
    let idJSON ={
      "id":id
    }
    httpHeaders = httpHeaders.set('auth-token',localStorage.getItem('auth-token') || '{}');
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/deleteText`,
    idJSON,{headers:httpHeaders}).pipe(tap(
      (res:JwtResponseI)=>{
        if(res){
          console.log(res);
        }
      })
    );
  }
  setHeaders():HttpHeaders{
    let httpHeaders = new HttpHeaders({
      'Content-Type':  'application/json',
      'auth-token': ''
    });
    httpHeaders = httpHeaders.set('auth-token',localStorage.getItem('auth-token') || '{}');
    return httpHeaders;
  }

  textListByAScore():Observable<TextI[]>{
    let httpHeaders = new HttpHeaders({
      'Content-Type':  'application/json',
      'auth-token': ''
    });
    httpHeaders = httpHeaders.set('auth-token',localStorage.getItem('auth-token') || '{}');
    this.authtoken = localStorage.getItem('auth-token');
    return this.httpClient.get<TextI[]>(`${this.AUTH_SERVER}/SortAscendentScore/`,{headers:httpHeaders});
  }
    
  textListByDScore():Observable<TextI[]>{
    let httpHeaders = new HttpHeaders({
      'Content-Type':  'application/json',
      'auth-token': ''
    });
    httpHeaders = httpHeaders.set('auth-token',localStorage.getItem('auth-token') || '{}');
    this.authtoken = localStorage.getItem('auth-token');
    return this.httpClient.get<TextI[]>(`${this.AUTH_SERVER}/SortDescendentScore/`,{headers:httpHeaders});
  }
  textListByADate():Observable<TextI[]>{
    let httpHeaders = new HttpHeaders({
      'Content-Type':  'application/json',
      'auth-token': ''
    });
    httpHeaders = httpHeaders.set('auth-token',localStorage.getItem('auth-token') || '{}');
    this.authtoken = localStorage.getItem('auth-token');
    return this.httpClient.get<TextI[]>(`${this.AUTH_SERVER}/SortAscendentDate/`,{headers:httpHeaders});
  }
  textListByDDate():Observable<TextI[]>{
    let httpHeaders = new HttpHeaders({
      'Content-Type':  'application/json',
      'auth-token': ''
    });
    httpHeaders = httpHeaders.set('auth-token',localStorage.getItem('auth-token') || '{}');
    this.authtoken = localStorage.getItem('auth-token');
    return this.httpClient.get<TextI[]>(`${this.AUTH_SERVER}/SortDescendentDate/`,{headers:httpHeaders});
  }


}
