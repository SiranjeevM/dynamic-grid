import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class DynamicGridService {
  constructor(private http:HttpClient){

  }
  loadAirports(){
    return this.http.get('assets/Airports.json');
  }
  loadEmployee(){
    return this.http.get('assets/Employee.json');
  }
  loadUserStudent(){
    return this.http.get('assets/Student.json');
  }
  
}
