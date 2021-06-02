import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostFile } from 'src/app/core/models/post-file.model';

import { FileTreeComponent } from './file-tree.component';

describe('FileTreeComponent', () => {
  let component: TestFileTreeComponent;
  let fixture: ComponentFixture<TestFileTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileTreeComponent, TestFileTreeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFileTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  @Component({
    selector: `app-test-file-tree`,
    template: `<app-file-tree [files]="files"></app-file-tree>`
  })
  class TestFileTreeComponent {
    public files: PostFile[] = [];

    setFiles(files: PostFile[]): void {
      this.files = files;
    }
  }
});
