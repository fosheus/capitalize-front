import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostConsultComponent } from './post-consult.component';

describe('PostConsultComponent', () => {
  let component: PostConsultComponent;
  let fixture: ComponentFixture<PostConsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostConsultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
