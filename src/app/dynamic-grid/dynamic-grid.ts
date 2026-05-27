import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { FormsModule }
from '@angular/forms';

import { DynamicGridService } from '../services/dynamic-grid';


@Component({
  selector: 'app-dynamic-grid',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './dynamic-grid.html',
  styleUrls: ['./dynamic-grid.css']
})
export class DynamicGrid
implements OnInit {

  tableData:
  Record<string, unknown>[] = [];

  columns: string[] = [];
  datasetNames = ['Employees','Airports','Students'];
  selectedDataset ='Employees';
  selectedColumn = '';
  selectedOrder = 'normal';
  
  constructor(private gridService:DynamicGridService) {}
  
  ngOnInit(): void {
    this.loadDataset();
  }


  loadDataset(): void {

    if (this.selectedDataset ==='Employees') {
      this.gridService.loadEmployees().subscribe(data => {
          this.tableData =data as Record<string,unknown>[];

          this.columns =this.gridService.generateColumns(this.tableData);
        });
    }
    
    if (this.selectedDataset ==='Airports') {
      this.gridService.loadAirports().subscribe(data => {
          this.tableData =data as Record<string,unknown>[];

          this.columns =this.gridService.generateColumns(this.tableData);
        });
    }

    if (this.selectedDataset ==='Students') {

      this.gridService.loadStudents().subscribe(data => {
           this.tableData =data as Record<string,unknown>[];

          this.columns =this.gridService.generateColumns(this.tableData);
        });
    }
  }


  sortTable(): void {

    if (this.selectedColumn === '' || this.selectedOrder === 'normal') {
      return;
    }

    this.tableData =this.gridService.sortData(this.tableData,this.selectedColumn,this.selectedOrder);
  }

}