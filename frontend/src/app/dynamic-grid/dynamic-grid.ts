import {Component,OnInit} from '@angular/core';
import { CommonModule }from '@angular/common';
import { FormsModule }from '@angular/forms';
import { DynamicGridService } from '../services/dynamic-grid';

@Component({
  selector: 'app-dynamic-grid',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './dynamic-grid.html',
  styleUrls: ['./dynamic-grid.css']
})
export class DynamicGrid implements OnInit {

  tableData:Record<string, unknown>[] = [];

  columns: string[] = [];
  datasetNames = ['Employees','Airports','Students'];
  selectedDataset ='Employees';
  currentPage=1;
  rowsPerPage=5;
  paginatedData:Record<string,unknown>[]=[];
  sortConfigurations=[
    {
      column:'',
      order:'ascending'
    }
  ];
  

  constructor(private gridService:DynamicGridService) {}
  
  ngOnInit(): void {
    this.loadDataset();
  }


  loadDataset(): void {

    if (this.selectedDataset === 'Employees') {

      this.gridService.loadEmployeesFromApi(this.currentPage,this.rowsPerPage,this.sortConfigurations).subscribe(data => {
          this.tableData =data as Record<string, unknown>[];
          console.log(this.tableData);
          this.columns =this.gridService.generateColumns(this.tableData);
          this.paginatedData =[...this.tableData];

        });

}
    
    if (this.selectedDataset ==='Airports') {
      this.gridService.loadAirports().subscribe(data => {
         this.tableData =data as Record<string,unknown>[];
          console.log(this.tableData);
          this.columns =this.gridService.generateColumns(this.tableData);
          this.updatePagination();
        });
    }

    if (this.selectedDataset ==='Students') {

      this.gridService.loadStudents().subscribe(data => {
          this.tableData =data as Record<string,unknown>[];
          console.log(this.tableData);
          this.columns =this.gridService.generateColumns(this.tableData);
          this.updatePagination();
        });
    }
  }

  sortTable(): void {

    if (this.selectedDataset === 'Employees') {

      this.currentPage = 1;

      this.loadDataset();

    }
    else {

      this.tableData =
        this.gridService.sortData(
          this.tableData,
          this.sortConfigurations
        );

      this.updatePagination();

    }

  }

  addSortRule():void{
    this.sortConfigurations.push({column:'',order:'ascending'})
  }

  removeSortRule(index:number):void{
    if(this.sortConfigurations.length>1){
      this.sortConfigurations.splice(index,1);
    }
  }
 
  updatePagination(): void {
    this.paginatedData =this.gridService.paginateData(this.tableData,this.currentPage,this.rowsPerPage);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadDataset();
      
    }
  }

  nextPage(): void {
    if(this.paginatedData.length!==0){
    this.currentPage++;
    this.loadDataset();
    }

    
  }


 
}