import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ManageTracksPlaylistComponent } from './manage-tracks-playlist.component';
import { TracksService } from '../../../Tracks/services/tracks.service';
import { PlaylistsService } from '../../services/playlists.service';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TrackDto } from '../../../Tracks/Models/track.dto';
import { PlaylistDto } from '../../Models/playlist.dto';
import { of } from 'rxjs';
import * as PlaylistActions from '../../actions/playlist.action';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ManageTracksPlaylistComponent', () => {
  let component: ManageTracksPlaylistComponent;
  let fixture: ComponentFixture<ManageTracksPlaylistComponent>;
  let tracksServiceSpy: jasmine.SpyObj<TracksService>;
  let playlistServiceSpy: jasmine.SpyObj<PlaylistsService>;
  let store: MockStore;

  const mockTrack: TrackDto = {
    id: 1,
    title: 'Song',
    duration_ms: 123000,
    external_id: 'abc',
    preview_url: 'http://audio.mp3',
    album: { images: [{ url: 'img.jpg' }] },
    name: 'Song',
  } as any;

  const mockPlaylist: PlaylistDto = {
    playlist_id: 10,
    name: 'Test Playlist',
    description: 'desc',
    images: [],
    owner_id: 1,
    tracks: [mockTrack],
    is_public: true,
    external_id: null,
    createdAt: '2024-01-01T00:00:00Z',
    owner: { display_name: 'Owner' }
  };

  beforeEach(async () => {
    tracksServiceSpy = jasmine.createSpyObj('TracksService', ['searchTracks']);
    playlistServiceSpy = jasmine.createSpyObj('PlaylistsService', ['dummy']); // Métodos reales no usados aquí

    await TestBed.configureTestingModule({
      imports: [ManageTracksPlaylistComponent],
      providers: [
        provideMockStore(),
        { provide: TracksService, useValue: tracksServiceSpy },
        { provide: PlaylistsService, useValue: playlistServiceSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Ignora componentes standalone hijos
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ManageTracksPlaylistComponent);
    component = fixture.componentInstance;
    component.playlist = mockPlaylist;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call tracksService.searchTracks and update searchResults', fakeAsync(() => {
    tracksServiceSpy.searchTracks.and.returnValue(of([mockTrack]));
    component.onSearchTracks('test');
    tick();
    expect(tracksServiceSpy.searchTracks).toHaveBeenCalledWith('test');
    expect(component.searchResults).toEqual([mockTrack]);
  }));

  it('should dispatch addTrackToPlaylist action', () => {
    spyOn(store, 'dispatch');
    component.playlist = mockPlaylist;
    component.addTrackToPlaylist(mockTrack);
    expect(store.dispatch).toHaveBeenCalledWith(
      PlaylistActions.addTrackToPlaylist({
        playlistId: mockPlaylist.playlist_id,
        trackExternalId: mockTrack.id.toString()
      })
    );
  });

  it('should not dispatch addTrackToPlaylist if playlist is undefined', () => {
    spyOn(store, 'dispatch');
    component.playlist = undefined;
    component.addTrackToPlaylist(mockTrack);
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should dispatch removeTrackFromPlaylist action', () => {
    spyOn(store, 'dispatch');
    component.playlist = mockPlaylist;
    component.removeTrackFromPlaylist(mockTrack);
    expect(store.dispatch).toHaveBeenCalledWith(
      PlaylistActions.removeTrackFromPlaylist({
        playlistId: mockPlaylist.playlist_id,
        trackId: mockTrack.id
      })
    );
  });

  it('should not dispatch removeTrackFromPlaylist if playlist is undefined', () => {
    spyOn(store, 'dispatch');
    component.playlist = undefined;
    component.removeTrackFromPlaylist(mockTrack);
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should play and pause audio when togglePlay is called', () => {
    const originalAudio = window.Audio;
    const playSpy = jasmine.createSpy('play');
    const pauseSpy = jasmine.createSpy('pause');
    (window as any).Audio = function () {
      return {
        play: playSpy,
        pause: pauseSpy,
        onended: null
      };
    };
  
    component.togglePlay(mockTrack);
    expect(component.currentPlayingTrackId).toBe(mockTrack.id);
  
    // Simula pausar
    component.togglePlay(mockTrack);
    expect(component.currentPlayingTrackId).toBeNull();
  
    // Restaura el constructor original
    (window as any).Audio = originalAudio;
  });

  it('should clean up audio on destroy', () => {
    component.audio = {
      pause: jasmine.createSpy('pause')
    } as any;
    component.ngOnDestroy();
    expect(component.audio).toBeNull();
  });
  
  it('should render search results and playlist tracks', () => {
    // Un track en searchResults
    component.searchResults = [{ ...mockTrack, id: 2, name: 'Search Song' }];
    // Un track diferente en playlist.tracks
    component.playlist = { ...mockPlaylist, tracks: [{ ...mockTrack, id: 3, title: 'Playlist Song' }] };
    fixture.detectChanges();
  
    const spans = fixture.nativeElement.querySelectorAll('ul li span.flex-1');
    expect(spans.length).toBeGreaterThan(1);
    expect(spans[0].textContent).toContain('Search Song');
    expect(spans[1].textContent).toContain('Playlist Song');
  });
});