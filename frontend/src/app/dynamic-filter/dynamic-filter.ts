import { Component, OnInit } from '@angular/core';
import { DynamicFilterService } from '../services/dynamic-filter-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-dynamic-filter-component',
  standalone: true,
  imports: [CommonModule, FormsModule, MatPaginatorModule],
  templateUrl: './dynamic-filter.html',
  styleUrl: './dynamic-filter.css',
})
export class DynamicFilterComponent implements OnInit {

  public data: any[] = []; //  data for table
  public tableKeys: string[] = [];// keys of the data objects for dynamic table headers

  public selectedDataset: string = 'Students'; // default dataset
  public selectedColumn: string = ''; // selected column for filtering
  public selectedOperator: string = 'contains'; // selected filter operator 

  public searchValue: string = ''; // value  for filtering
  public minValue: number | null = null; // minimum value for range filters 
  public maxValue: number | null = null; // maximum value for range filters 

  public rangeValue: number[] = []; // holds the range values for range filters 

  public isnumber: boolean = false;
  pageSize = 5;
  currentPage = 0;
  totalRecords = 0;
  allData: any[] = [];

  constructor(private dynamicFilterService: DynamicFilterService) { }

  ngOnInit(): void {
    this.loadData();
  }


  // FOR LOAD DATA
  loadData() {

    this.dynamicFilterService
      .getData(this.selectedDataset)
      .subscribe((data: any) => {

        this.allData = data;

        this.totalRecords = data.length;

        if (data.length > 0) {
          this.tableKeys = Object.keys(data[0]);
        }

        this.updatePagedData();

        this.rangeValue = [];

      });

  }

  resetFilter() {

    // for clear filter fields
    this.searchValue = '';
    this.minValue = null;
    this.maxValue = null;

    this.selectedColumn = '';
    this.selectedOperator = 'contains';

    // for reload original data
    this.currentPage = 0;

this.loadData();
  }
  onColumnChange() {

    const values = this.data
      .map(item => item[this.selectedColumn]);

    // Check if numeric
    this.isnumber = values.every(val => !isNaN(val));

    // Prepare range values only if numeric
    if (this.isnumber) {
      const numericValues = values
        .map(val => Number(val));

      this.rangeValue = [...new Set(numericValues)]
        .sort((a, b) => a - b);
    } else {
      this.rangeValue = [];
    }

    // reset operator if invalid
    if (!this.isnumber && this.selectedOperator === 'range') {
      this.selectedOperator = 'contains';
    }
  }

  // FOR APPLY FILTER
  applyFilterUnified(val: any, max?: any) {

    if (!this.selectedColumn) return;

    const params = {
      dataset: this.selectedDataset, // dataset to filter 
      column: this.selectedColumn, // column to filter on 
      filterType: this.selectedOperator, // type of filter 
      value: val, // value to filter by 
      max: max // optional max value for range filters 
    };

    this.dynamicFilterService.getFilteredData(params)
      .subscribe((res: any) => {

this.allData = res;

this.totalRecords = res.length;

this.currentPage = 0;

this.updatePagedData();

        if (res.length > 0) {
          this.tableKeys = Object.keys(res[0]);
        }
      });
  }
  getMinOptions(): number[] {
    return this.rangeValue.filter(
      v => !this.maxValue || v < this.maxValue
    );
  }

  getMaxOptions(): number[] {
    return this.rangeValue.filter(
      v => !this.minValue || v > this.minValue
    );
  }
updatePagedData() {

  const start =
    this.currentPage * this.pageSize;

  const end =
    start + this.pageSize;

  this.data =
    this.allData.slice(start, end);

}

onPageChange(event: PageEvent) {

  this.currentPage =
    event.pageIndex;

  this.pageSize =
    event.pageSize;

  this.updatePagedData();

}
}