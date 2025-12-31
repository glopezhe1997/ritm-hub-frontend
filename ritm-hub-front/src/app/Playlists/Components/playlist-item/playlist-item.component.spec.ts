import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaylistItemComponent } from './playlist-item.component';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

describe('PlaylistItemComponent', () => {
  let component: PlaylistItemComponent;
  let fixture: ComponentFixture<PlaylistItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistItemComponent],
      providers: [
        provideRouter([]) // <-- Esto provee ActivatedRoute y RouterLink
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistItemComponent);
    component = fixture.componentInstance;
    // Valores por defecto para los @Input
    component.playlistName = 'My Playlist';
    component.trackCount = 5;
    component.playlistId = 42;
    component.ownerByUser = true;
    component.imageUrl = 'test.jpg';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render playlist name, track count and image', () => {
    const name = fixture.debugElement.query(By.css('h3')).nativeElement;
    const count = fixture.debugElement.query(By.css('p')).nativeElement;
    const img = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(name.textContent).toContain('My Playlist');
    expect(count.textContent).toContain('5 tracks');
    expect(img.src).toContain('test.jpg');
    expect(img.alt).toBe('My Playlist');
  });

  it('should link to the correct playlist detail page', () => {
    const link = fixture.debugElement.query(By.css('a')).nativeElement;
    // routerLink is rendered as an array string
    expect(link.getAttribute('ng-reflect-router-link')).toContain('/playlists,42');
  });

  it('should show edit and delete buttons if ownerByUser is true', () => {
    component.ownerByUser = true;
    fixture.detectChanges();
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toBe(2);
  });

  it('should not show edit and delete buttons if ownerByUser is false', () => {
    component.ownerByUser = false;
    fixture.detectChanges();
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toBe(0);
  });

  it('should emit editPlaylist event with playlistId when edit button is clicked', () => {
    spyOn(component.editPlaylist, 'emit');
    component.ownerByUser = true;
    fixture.detectChanges();
    const editBtn = fixture.debugElement.queryAll(By.css('button'))[0];
    editBtn.triggerEventHandler('click');
    expect(component.editPlaylist.emit).toHaveBeenCalledWith(42);
  });

  it('should emit deletePlaylist event with playlistId when delete button is clicked', () => {
    spyOn(component.deletePlaylist, 'emit');
    component.ownerByUser = true;
    fixture.detectChanges();
    const deleteBtn = fixture.debugElement.queryAll(By.css('button'))[1];
    deleteBtn.triggerEventHandler('click');
    expect(component.deletePlaylist.emit).toHaveBeenCalledWith(42);
  });

  it('showButtons should return false if ownerByUser is undefined or false', () => {
    component.ownerByUser = undefined;
    expect(component.showButtons()).toBeFalse();
    component.ownerByUser = false;
    expect(component.showButtons()).toBeFalse();
  });

  it('showButtons should return true if ownerByUser is true', () => {
    component.ownerByUser = true;
    expect(component.showButtons()).toBeTrue();
  });
});