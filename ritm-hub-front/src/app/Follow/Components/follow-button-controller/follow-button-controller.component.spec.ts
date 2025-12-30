import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowButtonControllerComponent } from './follow-button-controller.component';

describe('FollowButtonControllerComponent', () => {
  let component: FollowButtonControllerComponent;
  let fixture: ComponentFixture<FollowButtonControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowButtonControllerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FollowButtonControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
