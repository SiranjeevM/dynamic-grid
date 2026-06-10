import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TreeService {

  private apiUrl =
    'http://localhost:5199/api/tree';

  constructor(
    private http: HttpClient
  ) { }

  getTree() {
    return this.http.get<any[]>(this.apiUrl);
  }
}