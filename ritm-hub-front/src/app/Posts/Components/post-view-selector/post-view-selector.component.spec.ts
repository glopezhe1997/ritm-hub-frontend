import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostViewSelectorComponent } from './post-view-selector.component';

describe('PostViewSelectorComponent', () => {
  let component: PostViewSelectorComponent;
  let fixture: ComponentFixture<PostViewSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostViewSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostViewSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
