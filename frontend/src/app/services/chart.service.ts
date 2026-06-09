import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
@Injectable({
  providedIn: 'root'
})
export class ChartService {
 
  private apiUrl = 'http://localhost:5199/api/chart';
 
  constructor(private http: HttpClient) {}
 
  getDepartmentChart() {
    return this.http.get<any[]>(this.apiUrl);
  }
}
 