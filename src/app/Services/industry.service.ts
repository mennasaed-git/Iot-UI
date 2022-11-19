import { Injectable } from '@angular/core';
import { Industry } from '../Models/industry';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IndustryService {

  BaseUrl : string = "http://localhost:3000/Industries"
  headers = new HttpHeaders();
  constructor(private http : HttpClient) { }

  getIndustries() {
  this.headers = this.headers.set("Access-Control-Allow-Origin", "*");
  this.headers = this.headers.set("Access-Control-Allow-Headers",  "Origin, X-Requested-With, Content-Type, Accept");
  
   return  this.http.get<any>(this.BaseUrl , {headers : this.headers});
 }

 getIndustry(id:number) {
  let apiUrl = this.BaseUrl +"/"+id.toString();

  this.headers = this.headers.set("Access-Control-Allow-Origin", "*");
  this.headers = this.headers.set("Access-Control-Allow-Headers",  "Origin, X-Requested-With, Content-Type, Accept");
   return  this.http.get<Industry>(apiUrl , {headers : this.headers});
 }

 EditIndustry(industry : Industry) {
  let apiUrl = this.BaseUrl +"/"+industry.id.toString();

  this.headers = this.headers.set("Access-Control-Allow-Origin", "*");
  this.headers = this.headers.set("Access-Control-Allow-Headers",  "Origin, X-Requested-With, Content-Type, Accept");
   return  this.http.put<any>(apiUrl , industry, {headers : this.headers});
 }

 RemoveIndustry(id : number)
 {
  let apiUrl = this.BaseUrl +"/"+id.toString();

  this.headers = this.headers.set("Access-Control-Allow-Origin", "*");
  this.headers = this.headers.set("Access-Control-Allow-Headers",  "Origin, X-Requested-With, Content-Type, Accept");
   return  this.http.delete<any>(apiUrl , {headers : this.headers});
 }

 CreateIndustry(industry : Industry) {
  this.headers = this.headers.set("Access-Control-Allow-Origin", "*");
  this.headers = this.headers.set("Access-Control-Allow-Headers",  "Origin, X-Requested-With, Content-Type, Accept");
  
   return  this.http.post<any>(this.BaseUrl , industry , {headers : this.headers});
 }

}
