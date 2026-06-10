export class TreeNode {
    id: number;
    parentId: number | null;
    label: string;
    children: TreeNode[];
    isExpanded: boolean;
    isSelected: boolean;

    constructor(
        id: number,
        parentId: number | null,
        label: string,
        children: TreeNode[]= [],
        isExpanded: boolean = false,
        isSelected: boolean = false
    ){
        this.id = id;
        this.parentId = parentId;
        this.label = label;
        this.children = children;
        this.isExpanded = isExpanded;
        this.isSelected = isSelected;
    }
}