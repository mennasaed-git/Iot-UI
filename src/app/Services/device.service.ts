import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device } from '../Models/device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  BaseUrl : string = "http://localhost:3000/Devices"
  headers = new HttpHeaders();
  constructor(private http : HttpClient) { }

  getDevices() {
  this.headers = this.headers.set("Access-Control-Allow-Origin", "*");
  this.headers = this.headers.set("Access-Control-Allow-Headers",  "Origin, X-Requested-With, Content-Type, Accept");
  
   return  this.http.get<any>(this.BaseUrl , {headers : this.headers});
 }

 getDevice(id:number) {
  let apiUrl = this.BaseUrl +"/"+id.toString();

  this.headers = this.headers.set("Access-Control-Allow-Origin", "*");
  this.headers = this.headers.set("Access-Control-Allow-Headers",  "Origin, X-Requested-With, Content-Type, Accept");
   return  this.http.get<Device>(apiUrl , {headers : this.headers});
 }

 EditDevice(device : Device) {
  let apiUrl = this.BaseUrl +"/"+device.id.toString();

  this.headers = this.headers.set("Access-Control-Allow-Origin", "*");
  this.headers = this.headers.set("Access-Control-Allow-Headers",  "Origin, X-Requested-With, Content-Type, Accept");
   return  this.http.put<any>(apiUrl , device, {headers : this.headers});
 }

 RemoveDevice(id : number)
 {
  console.log("id>",id)
  let apiUrl = this.BaseUrl +"/"+id.toString();

  this.headers = this.headers.set("Access-Control-Allow-Origin", "*");
  this.headers = this.headers.set("Access-Control-Allow-Headers",  "Origin, X-Requested-With, Content-Type, Accept");
   return  this.http.delete<any>(apiUrl , {headers : this.headers});
 }

 CreateDevice(device : Device) {
  this.headers = this.headers.set("Access-Control-Allow-Origin", "*");
  this.headers = this.headers.set("Access-Control-Allow-Headers",  "Origin, X-Requested-With, Content-Type, Accept");
  
   return  this.http.post<any>(this.BaseUrl , device , {headers : this.headers});
 }
}
