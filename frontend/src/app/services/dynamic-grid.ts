import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DynamicGridService {

  private apiUrl = 'http://localhost:5199/api/grid';

  constructor(private http: HttpClient) { }

  loadGridData(tableName: string, pageNumber: number, pageSize: number, sortRules: { column: string; order: string; }[]) {
    const apiSortRules: { column: string; order: string; }[] = [];

    for (let i = 0; i < sortRules.length; i++) {
      if (sortRules[i].column !== '') {
        apiSortRules.push({
          column: sortRules[i].column,
          order: sortRules[i].order === 'ascending' ? 'ASC' : 'DESC'
        });
      }
    }
    return this.http.get(this.apiUrl, { params: { tableName, pageNumber, pageSize, sortRules: JSON.stringify(apiSortRules) } });
  }

  generateColumns(data: Record<string, unknown>[]): string[] {
    if (data.length === 0) {
      return [];
    }
    return Object.keys(data[0]);
  }
  exportExcel(sortRules: {column: string;order: string;}[]) {
    const apiSortRules =sortRules.filter(x => x.column !== '').map(x => ({
          column: x.column,
          order:x.order === 'ascending'? 'ASC': 'DESC'
        }));

    return this.http.get(`${this.apiUrl}/export`,{params: {sortRules:JSON.stringify(apiSortRules)},responseType: 'blob'});
  }
}