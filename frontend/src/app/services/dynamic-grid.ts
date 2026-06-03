import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DynamicGridService {

  constructor(private http: HttpClient) {}

  loadEmployees() {
    return this.http.get('assets/Employee.json');
  }

  loadAirports() {
    return this.http.get('assets/Airports.json');
  }

  loadStudents() {
    return this.http.get('assets/Student.json');

  }

  generateColumns(data: Record<string, unknown>[]): string[] {
    if (data.length === 0) {
      return [];
    }
    return Object.keys(data[0]);
  }

  sortData(data: Record<string, unknown>[],rules: {column: string;order: string;}[]): Record<string, unknown>[] {
  
    for (let i = 0;i < data.length;i++) {

      for (let j = 0;j < data.length - i - 1;j++) {

        let shouldSwap = false;

        for (let ruleIndex = 0;ruleIndex < rules.length;ruleIndex++) {

          const rule =rules[ruleIndex];

          if (rule.column === '') {
            continue;
          }
  
          const first =data[j][rule.column];
          const second =data[j + 1][rule.column];
          if (first === second) {
            continue;
          }
  
          if (rule.order === 'ascending') {
  
            shouldSwap =first! > second!;
          }
          else {
            shouldSwap =first! < second!;
          }
          break;
        }
  
        if (shouldSwap) {
  
          const temp =data[j];
          data[j] =data[j + 1];
          data[j + 1] =temp;
        }
      }
    }
    return data;
  }
 

  paginateData(data: Record<string, unknown>[],currentPage: number,rowsPerPage: number): Record<string, unknown>[] {
    const result: Record<string, unknown>[] = [];
    const startIndex =(currentPage - 1) * rowsPerPage;
    const endIndex =startIndex + rowsPerPage;
  
    for (let i = startIndex;i < endIndex &&i < data.length;i++) {
      result.push(data[i]);
    }
    return result;
  }
 
}