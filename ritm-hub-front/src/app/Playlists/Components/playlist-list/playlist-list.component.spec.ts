import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaylistListComponent } from './playlist-list.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { PlaylistDto } from '../../Models/playlist.dto';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as PlaylistActions from '../../actions/playlist.action';
import { provideRouter } from '@angular/router';

describe('PlaylistListComponent', () => {
  let component: PlaylistListComponent;
  let fixture: ComponentFixture<PlaylistListComponent>;
  let store: MockStore;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockPlaylists: PlaylistDto[] = [
    {
      playlist_id: 1,
      name: 'My Playlist',
      description: 'desc',
      images: ['img1.jpg'],
      owner_id: 1,
      tracks: [{ id: 1, title: 'Song', duration_ms: 123, external_id: 'abc', preview_url: '' }],
      is_public: true,
      external_id: null,
      createdAt: '2024-01-01T00:00:00Z',
      owner: { display_name: 'Owner' }
    }
  ];

  const mockSharedPlaylists: PlaylistDto[] = [
    {
      playlist_id: 2,
      name: 'Shared Playlist',
      description: 'desc',
      images: ['img2.jpg'],
      owner_id: 2,
      tracks: [{ id: 2, title: 'Other Song', duration_ms: 456, external_id: 'def', preview_url: '' }],
      is_public: false,
      external_id: null,
      createdAt: '2024-01-02T00:00:00Z',
      owner: { display_name: 'Other Owner' }
    }
  ];

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [PlaylistListComponent],
      providers: [
        provideMockStore({
          initialState: {
            playlistState: {
              playlists: mockPlaylists,
              sharedPlaylistsWithMe: mockSharedPlaylists
            }
          }
        }),
        // { provide: Router, useValue: routerSpy },
        provideRouter([])
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Ignora app-playlist-item
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(PlaylistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch getUserPlaylists and getPlaylistsSharedWithMe on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(PlaylistActions.getUserPlaylists());
    expect(dispatchSpy).toHaveBeenCalledWith(PlaylistActions.getPlaylistsSharedWithMe());
  });

  it('should render user playlists', () => {
    fixture.detectChanges();
    const playlistTitles = fixture.nativeElement.querySelectorAll('ul')[0].textContent;
    expect(playlistTitles).toContain('My Playlist');
  });

  it('should render shared playlists', () => {
    fixture.detectChanges();
    const sharedTitles = fixture.nativeElement.querySelectorAll('ul')[1].textContent;
    expect(sharedTitles).toContain('Shared Playlist');
  });

  it('should navigate to edit when navigateToEdit is called', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    component.navigateToEdit(1);
    expect(router.navigate).toHaveBeenCalledWith([`/playlists/edit/1`]);
  });

  it('should dispatch deleteUserPlaylist when onDeletePlaylist is called', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.onDeletePlaylist(1);
    expect(dispatchSpy).toHaveBeenCalledWith(PlaylistActions.deleteUserPlaylist({ playlistId: 1 }));
  });

  it('should not dispatch deleteUserPlaylist if playlistId is undefined', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.onDeletePlaylist(undefined);
    expect(dispatchSpy).not.toHaveBeenCalled();
  });
});