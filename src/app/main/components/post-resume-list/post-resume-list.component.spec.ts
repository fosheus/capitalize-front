import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostResumeListComponent } from './post-resume-list.component';

describe('PostResumeListComponent', () => {
  let component: PostResumeListComponent;
  let fixture: ComponentFixture<PostResumeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostResumeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostResumeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
