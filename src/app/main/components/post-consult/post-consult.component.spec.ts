import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PostService } from 'src/app/core/services/post/post.service';

import { PostConsultComponent } from './post-consult.component';

describe('PostConsultComponent', () => {
  let component: PostConsultComponent;
  let fixture: ComponentFixture<PostConsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostConsultComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [PostService],
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
