import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatePostsComponent } from './validate-posts.component';

describe('ValidatePostsComponent', () => {
  let component: ValidatePostsComponent;
  let fixture: ComponentFixture<ValidatePostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidatePostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
