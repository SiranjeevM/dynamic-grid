import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNode } from '../tree-node/tree-node.model';
import { TreeService } from '../services/tree.service';
import { TreeNodeComponent } from '../tree-node/tree-node';

@Component({
  selector: 'app-tree-view',
  standalone: true,
  imports: [CommonModule, TreeNodeComponent],
  templateUrl: './tree-view.html',
  styleUrl: './tree-view.css'
})
export class TreeViewComponent implements OnInit {

  treeNodes: TreeNode[] = [];
  errorMessage: string = '';

  constructor(private treeService: TreeService) { }

  ngOnInit(): void {
    this.loadNodes();
  }

  loadNodes(): void {

    this.treeService
      .getTree()
      .subscribe({

        next: (data: any) => {

          this.treeNodes = data;

        },

        error: (err) => {

          this.errorMessage = err.message;

        }

      });
  }

  onNodeSelected(node: TreeNode): void {
    this.treeNodes = this.clearSelection(this.treeNodes);
    node.isSelected = true;
  }

  onNodeToggled(node: TreeNode): void {
    node.isExpanded = !node.isExpanded;
  }

  clearSelection(nodes: TreeNode[]): TreeNode[] {
    return nodes.map(node => {
      node.isSelected = false;
      if (node.children.length) {
        node.children = this.clearSelection(node.children);
      }
      return node;
    });
  }

}