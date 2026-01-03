import { TestBed } from '@angular/core/testing';
import { PlaylistsService } from './playlists.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PlaylistDto } from '../Models/playlist.dto';
import { PlaylistSpotifyDto } from '../Models/playlist-spotify.dto';
import { CreatePlaylistsDto } from '../Models/create-playlists.dto';
import { SharedPlaylistsResultDto } from '../Models/shared-playlists-result.dto';
import { UpdatePlaylistDto } from '../Models/update-playlist.dto';
import { environment } from '../../../environments/environment';

describe('PlaylistsService', () => {
  let service: PlaylistsService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;

  // Mock data
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

  const mockSpotifyPlaylist: PlaylistSpotifyDto = {
    id: 'sp1',
    name: 'Spotify Playlist',
    description: 'desc',
    images: [
      { url: 'img1.jpg', height: 300, width: 300 }
    ],
    owner: {
      display_name: 'Spotify Owner',
      external_urls: { spotify: 'https://open.spotify.com/user/spotifyowner' },
      href: 'https://api.spotify.com/v1/users/spotifyowner',
      id: 'spotifyowner',
      type: 'user',
      uri: 'spotify:user:spotifyowner'
    },
    tracks: {
      href: 'https://api.spotify.com/v1/playlists/sp1/tracks',
      total: 10
    },
    public: true,
    collaborative: false,
    external_urls: { spotify: 'https://open.spotify.com/playlist/sp1' },
    href: 'https://api.spotify.com/v1/playlists/sp1',
    snapshot_id: 'snapshot123',
    type: 'playlist',
    uri: 'spotify:playlist:sp1',
    primary_color: null
  };

  const mockCreateDto: CreatePlaylistsDto = {
    name: 'New Playlist',
    description: 'desc',
    is_public: true,
    images: ['img1.jpg']
  };

  const mockUpdateDto: UpdatePlaylistDto = {
    name: 'Updated Playlist',
    description: 'updated desc',
    is_public: false,
    images: ['img2.jpg']
  };

  const mockSharedResult: SharedPlaylistsResultDto = {
    playlistId: 1,
    shared_with_user_id: 2,
    shared_by_user_id: 10,
    shared_at: new Date('2024-01-01T00:00:00Z')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlaylistsService]
    });
    service = TestBed.inject(PlaylistsService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get trending playlists', () => {
    service.getTrendingPlaylists().subscribe(res => {
      expect(res).toEqual([mockSpotifyPlaylist]);
    });
    const req = httpMock.expectOne(`${apiUrl}/playlists/trending`);
    expect(req.request.method).toBe('GET');
    req.flush([mockSpotifyPlaylist]);
  });

  it('should get playlist by id with Authorization header', () => {
    localStorage.setItem('access_token', 'token');
    service.getPlaylistById(1).subscribe(res => {
      expect(res).toEqual(mockPlaylist);
    });
    const req = httpMock.expectOne(`${apiUrl}/playlists/1`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer token');
    req.flush(mockPlaylist);
  });

  it('should get user playlists', () => {
    localStorage.setItem('access_token', 'token');
    service.getUserPlaylists().subscribe(res => {
      expect(res).toEqual([mockPlaylist]);
    });
    const req = httpMock.expectOne(`${apiUrl}/playlists/user`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer token');
    req.flush([mockPlaylist]);
  });

  it('should create user playlist', () => {
    localStorage.setItem('access_token', 'token');
    service.postCreateUserPlaylist(mockCreateDto).subscribe(res => {
      expect(res).toEqual(mockPlaylist);
    });
    const req = httpMock.expectOne(`${apiUrl}/playlists/create`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCreateDto);
    expect(req.request.headers.get('Authorization')).toBe('Bearer token');
    req.flush(mockPlaylist);
  });

  it('should update user playlist', () => {
    localStorage.setItem('access_token', 'token');
    service.updateUserPlaylist(1, mockUpdateDto).subscribe(res => {
      expect(res).toEqual(mockPlaylist);
    });
    const req = httpMock.expectOne(`${apiUrl}/playlists/1`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(mockUpdateDto);
    expect(req.request.headers.get('Authorization')).toBe('Bearer token');
    req.flush(mockPlaylist);
  });

  it('should delete user playlist', () => {
    localStorage.setItem('access_token', 'token');
    service.deleteUserPlaylist(1).subscribe(res => {
      expect(res).toBe('deleted');
    });
    const req = httpMock.expectOne(`${apiUrl}/playlists/1`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe('Bearer token');
    req.flush('deleted');
  });

  it('should add tracks to playlist', () => {
    localStorage.setItem('access_token', 'token');
    service.addTracksToPlaylist(1, 'trackid').subscribe(res => {
      expect(res).toEqual(mockPlaylist);
    });
    const req = httpMock.expectOne(`${apiUrl}/playlists/1/tracks`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ trackExternalId: 'trackid' });
    expect(req.request.headers.get('Authorization')).toBe('Bearer token');
    req.flush(mockPlaylist);
  });

  it('should remove track from playlist', () => {
    localStorage.setItem('access_token', 'token');
    service.removeTrackFromPlaylist(1, 2).subscribe(res => {
      expect(res).toEqual(mockPlaylist);
    });
    const req = httpMock.expectOne(`${apiUrl}/playlists/1/tracks/2`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe('Bearer token');
    req.flush(mockPlaylist);
  });

  it('should share playlist with user', () => {
    localStorage.setItem('access_token', 'token');
    service.sharePlaylistWithUser(1, 2).subscribe(res => {
      expect(res).toEqual(mockSharedResult);
    });
    const req = httpMock.expectOne(`${apiUrl}/share-playlists/2/playlists`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ playlist_id: 1, shared_with_user_id: 2 });
    expect(req.request.headers.get('Authorization')).toBe('Bearer token');
    req.flush(mockSharedResult);
  });

  it('should get playlists shared with me', () => {
    localStorage.setItem('access_token', 'token');
    service.getPlaylistsSharedWithMe().subscribe(res => {
      expect(res).toEqual([mockPlaylist]);
    });
    const req = httpMock.expectOne(`${apiUrl}/share-playlists/received`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer token');
    req.flush([mockPlaylist]);
  });

  it('should get shared playlist by id', () => {
    localStorage.setItem('access_token', 'token');
    service.getSharedPlaylistById(1).subscribe(res => {
      expect(res).toEqual(mockPlaylist);
    });
    const req = httpMock.expectOne(`${apiUrl}/share-playlists/playlists/1`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer token');
    req.flush(mockPlaylist);
  });
});