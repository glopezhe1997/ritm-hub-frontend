import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaylistDetailComponent } from './playlist-detail.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { PlaylistDto } from '../../Models/playlist.dto';
import { getPlaylistById } from '../../actions/playlist.action';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { selectPlaylist } from '../../selectors/playlist.selectors';

describe('PlaylistDetailComponent', () => {
  let component: PlaylistDetailComponent;
  let fixture: ComponentFixture<PlaylistDetailComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;

  const mockPlaylist: PlaylistDto = {
    playlist_id: 1,
    name: 'Test Playlist',
    description: 'desc',
    images: ['img1.jpg'],
    owner_id: 10,
    tracks: [{ id: 1, title: 'Song', duration_ms: 123, external_id: 'abc', preview_url: '' }],
    is_public: true,
    external_id: 'extid',
    createdAt: '2024-01-01T00:00:00Z',
    owner: { display_name: 'Owner' }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PlaylistDetailComponent,
        HttpClientTestingModule
    ],
      providers: [
        provideMockStore({
          initialState: {
            playlistState: { playlist: mockPlaylist },
            sharedPlaylistWithMe: null
          }
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => '1' }), 
            snapshot: { paramMap: { get: () => '1' } }
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Para ignorar componentes hijos
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(PlaylistDetailComponent);
    component = fixture.componentInstance;
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch getPlaylistById on init', () => {
    expect(dispatchSpy).toHaveBeenCalledWith(getPlaylistById({ playlistId: 1 }));
  });

  it('should render playlist details if playlist exists', () => {
    component.playlist = mockPlaylist;
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('h2');
    expect(title.textContent).toContain('Test Playlist');
    const tracks = fixture.nativeElement.querySelector('.text-sm.text-gray-400');
    expect(tracks.textContent).toContain('1 tracks');
  });

  it('should render shared playlist if playlist is null and sharedPlaylist exists', () => {
    component.playlist = null;
    component.sharedPlaylist = { ...mockPlaylist, name: 'Shared Playlist', playlist_id: 2 };
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('h2');
    expect(title.textContent).toContain('Shared Playlist');
  });

  it('should render default image if images is empty', () => {
    component.playlist = { ...mockPlaylist, images: [] };
    fixture.detectChanges();
    const img = fixture.nativeElement.querySelector('img');
    expect(img.src).toContain('assets/icons/playlists-icon.png');
  });

  it('should render description if present', () => {
    component.playlist = { ...mockPlaylist, description: 'desc' };
    fixture.detectChanges();
    const desc = fixture.nativeElement.querySelector('p.italic');
    expect(desc.textContent).toContain('desc');
  });

  it('should render "Private" if is_public is false', () => {
    component.playlist = { ...mockPlaylist, is_public: false };
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('span.bg-gray-700');
    expect(badge.textContent).toContain('Private');
  });

  it('should render "Public" if is_public is true', () => {
    component.playlist = { ...mockPlaylist, is_public: true };
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('span.bg-green-700');
    expect(badge.textContent).toContain('Public');
  });

  it('should not render description if not present', () => {
    component.playlist = { ...mockPlaylist, description: undefined };
    fixture.detectChanges();
    const desc = fixture.nativeElement.querySelector('p.italic');
    expect(desc).toBeNull();
  });
  
  it('should render default image if images is undefined', () => {
    component.playlist = { ...mockPlaylist, images: undefined };
    fixture.detectChanges();
    const img = fixture.nativeElement.querySelector('img');
    expect(img.src).toContain('assets/icons/playlists-icon.png');
  });
  
  it('should not render anything if both playlist and sharedPlaylist are null', () => {
    component.playlist = null;
    component.sharedPlaylist = null;
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('h2');
    expect(title).toBeNull();
  });
      
  it('should update playlist when store emits new value', () => {
    const newPlaylist = { ...mockPlaylist, name: 'Updated' };
    store.overrideSelector(selectPlaylist, newPlaylist);
    store.refreshState();
    fixture.detectChanges();
    expect(component.playlist?.name).toBe('Updated');
  });
});