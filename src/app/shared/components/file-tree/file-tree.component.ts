import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { PostFile } from 'src/app/core/models/post-file.model';

export class TreeFile {
  id: number;
  path: string;
  paths: string[];

}


export class TreeFileNode {

  value: string;
  children: TreeFileNode[];
  id: number;
  path: string;
  folder: boolean;

}

export class TreeFileFlatNode {
  value: string;
  level: number;
  expandable: boolean;
  fullPath: string;
}

@Component({
  selector: 'app-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.scss']
})
export class FileTreeComponent implements OnInit {

  private pFiles: PostFile[];

  @Output() fileClicked = new EventEmitter<string>();

  @Input() set files(value: PostFile[]) {

    this.pFiles = value;
    this.filesChanged();
  }

  get files(): PostFile[] {
    return this.pFiles;
  }

  flatNodeMap = new Map<TreeFileFlatNode, TreeFileNode>();
  nestedNodeMap = new Map<TreeFileNode, TreeFileFlatNode>();

  selectedParent: TreeFileFlatNode | null = null;

  treeControl: FlatTreeControl<TreeFileFlatNode>;

  treeFlattener: MatTreeFlattener<TreeFileNode, TreeFileFlatNode>;

  dataSource: MatTreeFlatDataSource<TreeFileNode, TreeFileFlatNode>;



  constructor() {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<TreeFileFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  }

  getLevel = (node: TreeFileFlatNode) => node.level;

  isExpandable = (node: TreeFileFlatNode) => node.expandable;

  getChildren = (node: TreeFileNode): TreeFileNode[] => node.children;

  hasChild = (n: number, nodeData: TreeFileFlatNode) => nodeData.expandable;

  hasNoContent = (n: number, nodeData: TreeFileFlatNode) => nodeData.value === '';


  transformer = (node: TreeFileNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.value === node.value
      ? existingNode
      : new TreeFileFlatNode();
    flatNode.value = node.value;
    flatNode.level = level;
    flatNode.fullPath = node.path;
    flatNode.expandable = !!node.children?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  ngOnInit(): void {
    this.filesChanged();

  }


  private filesChanged(): void {
    this.files.sort((a, b) => a.path.localeCompare(b.path));
    this.files.forEach(f => {
      f.paths = f.path.split(/[\/\\]/);
    });
    const unflattened: any = {};
    for (const f of this.files) {
      f.paths.reduce((acc, currentPath, j) => {
        if (acc[currentPath]) {
          return acc[currentPath];
        } else {
          const node = new TreeFileNode();
          node.id = f.id;
          node.path = f.path;
          node.value = f.paths.length - 1 === j ? f.paths[j] : '';
          node.folder = f.paths.length - 1 !== j;
          acc[currentPath] = node;
          return acc[currentPath];
        }
      }, unflattened);
    }
    this.dataSource.data = this.buildFileTree(unflattened, 0);

  }

  buildFileTree(obj: { [key: string]: any }, level: number): TreeFileNode[] {
    return Object.keys(obj).reduce<TreeFileNode[]>((accumulator, key) => {
      const value = obj[key];
      if (value != null && value.path !== undefined) {

        const node = new TreeFileNode();
        node.id = value.id;
        node.path = value.path;

        node.value = key;

        if (value.folder) {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.value = value.value;
        }
        accumulator = accumulator.concat(node);
      }

      return accumulator;
    }, []);
  }

  clickFile(node: TreeFileFlatNode): void {
    this.fileClicked.emit(node.fullPath);
  }

}
