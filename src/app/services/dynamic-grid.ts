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

  sortData(data: Record<string, unknown>[],selectedColumn: string,selectedOrder: string): Record<string, unknown>[] {
    for (let i = 0;i < data.length;i++) {
      for (let j = 0;j < data.length - i - 1;j++) {
        const first =data[j][selectedColumn];

        const second =data[j + 1][selectedColumn];

        let shouldSwap = false;

        if (selectedOrder === 'ascending' &&first! > second!) {
        // ASCENDING 
          shouldSwap = true;
        }

        if (selectedOrder === 'descending' &&first! < second!) {
          // DESCENDING 
          shouldSwap = true;
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

}