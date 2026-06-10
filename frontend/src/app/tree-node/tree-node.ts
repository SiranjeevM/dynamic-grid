import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNode } from './tree-node.model';
 
@Component({
  selector: 'app-tree-node',
  standalone: true,
  imports: [CommonModule, TreeNodeComponent],
  templateUrl: './tree-node.html',
  styleUrls: ['./tree-node.css']
})

export class TreeNodeComponent {

  @Input() node!: TreeNode;

  onToggle() {
    this.node.isExpanded = !this.node.isExpanded;   
  }
  
  onSelect() {
    this.node.isSelected = !this.node.isSelected;   
  }
}

 