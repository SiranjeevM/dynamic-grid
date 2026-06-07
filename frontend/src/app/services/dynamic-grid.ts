import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DynamicGridService {

  private apiUrl = 'http://localhost:5199/api/employee';

  constructor(private http: HttpClient) {}

  loadEmployeesFromApi(pageNumber: number,pageSize: number,sortRules: { column: string; order: string }[]) {

    const apiSortRules = [];

    for (let i = 0; i < sortRules.length; i++) {

      if (sortRules[i].column !== '') {

        apiSortRules.push({
          column: sortRules[i].column,
          order:sortRules[i].order === 'ascending'? 'ASC': 'DESC'});
      }
    }

    return this.http.post(this.apiUrl,{pageNumber,pageSize,sortRules: apiSortRules});
  }

  generateColumns(data: Record<string, unknown>[]): string[] {
    if (data.length === 0) {
      return [];
    }
    return Object.keys(data[0]);
  }
}