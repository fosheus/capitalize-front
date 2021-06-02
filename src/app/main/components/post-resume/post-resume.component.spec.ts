import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { PostResumeComponent } from './post-resume.component';

describe('PostResumeComponent', () => {
  let component: PostResumeComponent;
  let fixture: ComponentFixture<PostResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostResumeComponent],
      imports: [RouterTestingModule, MatDialogModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
