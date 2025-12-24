import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTracksPlaylistComponent } from './manage-tracks-playlist.component';

describe('ManageTracksPlaylistComponent', () => {
  let component: ManageTracksPlaylistComponent;
  let fixture: ComponentFixture<ManageTracksPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageTracksPlaylistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageTracksPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
