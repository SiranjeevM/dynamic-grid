import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DynamicGridService } from '../services/dynamic-grid';

@Component({
  selector: 'app-dynamic-grid',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dynamic-grid.html',
  styleUrls: ['./dynamic-grid.css']
})
export class DynamicGrid implements OnInit {

  tableData: Record<string, unknown>[] = [];
  columns: string[] = [];
  selectedDataset = 'Students';
  currentPage = 1;
  rowsPerPage = 6;
  sortConfigurations = [
    {
      column: '',
      order: 'ascending'
    }
  ];

  constructor(private gridService: DynamicGridService) { }

  ngOnInit(): void {
    this.loadState();
    this.loadDataset();
  }

  loadDataset(): void {
    this.gridService.loadGridData(this.selectedDataset,this.currentPage,this.rowsPerPage,this.sortConfigurations).subscribe(data => {
        this.tableData =data as Record<string, unknown>[];
        this.columns =this.gridService.generateColumns(this.tableData);
      });
  }

  sortTable(): void {
    this.currentPage = 1;
    this.saveState();
    this.loadDataset();
  }

  addSortRule(): void {
    this.sortConfigurations.push({column: '',order: 'ascending'});
    this.saveState();
  }

  removeSortRule(index: number): void {
    if (this.sortConfigurations.length > 1) {
      this.sortConfigurations.splice(index,1);
      this.saveState();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.saveState();
      this.loadDataset();
    }
  }

  nextPage(): void {
    if (this.tableData.length > 0) {
      this.currentPage++;
      this.saveState();
      this.loadDataset();
    }
  }

  onDatasetChanged(): void {
    this.currentPage = 1;
    this.sortConfigurations = [
      {
        column: '',
        order: 'ascending'
      }
    ];
    this.saveState();
    this.loadDataset();
  }

  saveState(): void {
    localStorage.setItem('gridSortRules',JSON.stringify(this.sortConfigurations));
    localStorage.setItem('gridCurrentPage',this.currentPage.toString());
    localStorage.setItem('gridSelectedDataset',this.selectedDataset);
  }

  loadState(): void {
    const savedRules =localStorage.getItem('gridSortRules');
    if (savedRules) {
      this.sortConfigurations =JSON.parse(savedRules);
    }
    const savedPage =localStorage.getItem('gridCurrentPage');
    if (savedPage) {
      this.currentPage =Number(savedPage);
    }

    const savedDataset =localStorage.getItem('gridSelectedDataset');
    if (savedDataset) {
      this.selectedDataset =savedDataset;
    }
  }
}