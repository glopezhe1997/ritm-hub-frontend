import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistSelectorModalComponent } from './playlist-selector-modal.component';

describe('PlaylistSelectorModalComponent', () => {
  let component: PlaylistSelectorModalComponent;
  let fixture: ComponentFixture<PlaylistSelectorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistSelectorModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaylistSelectorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
