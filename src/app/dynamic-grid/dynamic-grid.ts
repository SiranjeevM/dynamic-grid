import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DynamicGridService } from '../services/dynamic-grid';

@Component({
  selector: 'app-dynamic-grid',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './dynamic-grid.html',
  styleUrls: ['./dynamic-grid.css'],
})
export class DynamicGrid implements OnInit {
  

  tableData:Record<string,unknown>[]   = [];
  selectedColumn='';
  selectedOrder='normal';
  datasetNames=['Airports','Employee','Student'];
  selectedDataset='airports';
  columns: string[] = [];
  constructor(private gridService:DynamicGridService){

  }

  ngOnInit(): void {
    this.loadDataset();
  }
  loadDataset(): void {
  
  
    if (this.selectedDataset === 'Airports') {
  
      this.gridService
        .loadAirports()
        .subscribe(data => {
  
          this.tableData =data as Record<string, unknown>[];
  
          this.generateColumns();
  
        });
  
    }
  
  
    if (this.selectedDataset === 'Employee') {
  
      this.gridService
        .loadEmployee()
        .subscribe(data => {
  
          this.tableData =
            data as Record<string, unknown>[];
  
          this.generateColumns();
  
        });
  
    }

  
    if (this.selectedDataset === 'Student') {
  
      this.gridService
        .loadUserStudent()
        .subscribe(data => {
  
          this.tableData =
            data as Record<string, unknown>[];
          this.generateColumns();
        });
    }
  }
  generateColumns() {
    if(this.tableData.length>0){
      this.columns=Object.keys(this.tableData[0]);
    }
  }
 
   sortTable(): void {
    if(this.selectedColumn===''|| this.selectedOrder==='normal'){
      return;
    }
    for(let i=0;i<this.tableData.length;i++){
      for(let j=0;j<this.tableData.length-i-1;j++){
        const first=this.tableData[j][this.selectedColumn];
        const second=this.tableData[j+1][this.selectedColumn];
        let shouldSwap=false;
        if(this.selectedOrder==='ascending' && first!>second!){
          shouldSwap=true
        }
        if(this.selectedOrder==='descending' && first!<second!){
          shouldSwap=true
        }
        if(shouldSwap){
          const temp=this.tableData[j];
          this.tableData[j]=this.tableData[j+1];
          this.tableData[j+1]=temp;
        }

      }
    }
 
}
 
}