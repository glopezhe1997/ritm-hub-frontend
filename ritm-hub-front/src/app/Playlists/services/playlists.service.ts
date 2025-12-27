import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaylistDto } from '../Models/playlist.dto';
import { environment } from '../../../environments/environment';
import { UserDto } from '../../Users/models/user.dto';
import { PlaylistSpotifyDto } from '../Models/playlist-spotify.dto';
import { CreatePlaylistsDto } from '../Models/create-playlists.dto';
import { SharedPlaylistsResultDto } from '../Models/shared-playlists-result.dto';
import { UpdatePlaylistDto } from '../Models/update-playlist.dto';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {
  private url = `${environment.apiUrl}/playlists`;
  private sharePlaylistUrl = `${environment.apiUrl}/share-playlists`;
  constructor(private http: HttpClient) { }

  getTrendingPlaylists(): Observable<PlaylistSpotifyDto[]> {
    return this.http.get<PlaylistSpotifyDto[]>(`${this.url}/trending`);
  }

  getPlaylistById(id: number): Observable<PlaylistDto> {
    const token = localStorage.getItem('access_token');
    return this.http.get<PlaylistDto>(`${this.url}/${id}`, {
      headers: { Authorization: `Bearer ${token}`}
    });
  }

  getUserPlaylists(): Observable<PlaylistDto[]> {
    const token = localStorage.getItem('access_token');
    return this.http.get<PlaylistDto[]>(`${this.url}/user`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  //Create playlist
  postCreateUserPlaylist(playlist: CreatePlaylistsDto): Observable<PlaylistDto> {
    const token = localStorage.getItem('access_token');
    return this.http.post<PlaylistDto>(
      `${this.url}/create`,
      playlist,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  }

  //Update playlist
  updateUserPlaylist(id: number, updateData: UpdatePlaylistDto): Observable<PlaylistDto> {
    const token = localStorage.getItem('access_token');
    return this.http.patch<PlaylistDto>(
      `${this.url}/${id}`,
      updateData,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  }

  //Delete playlist
  deleteUserPlaylist(id: number): Observable<string> {
    const token = localStorage.getItem('access_token');
    return this.http.delete<string>(`${this.url}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  //Add Tracks to Playlist
  addTracksToPlaylist(id: number, trackExternalId: string | undefined | null): Observable<PlaylistDto> {
    const token = localStorage.getItem('access_token');
    return this.http.patch<PlaylistDto>(
      `${this.url}/${id}/tracks`,
      { trackExternalId },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  }

  //Remove Tracks from Playlist
  removeTrackFromPlaylist(playlistId: number, trackId: number): Observable<PlaylistDto> {
    const token = localStorage.getItem('access_token');
    return this.http.delete<PlaylistDto>(
      `${this.url}/${playlistId}/tracks/${trackId}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  }

  //Share Playlist with User
  sharePlaylistWithUser(
    playlistId: number, 
    shareWithUserId: number
  ): Observable<SharedPlaylistsResultDto> {
    const token = localStorage.getItem('access_token');
    return this.http.post<SharedPlaylistsResultDto>(
      `${this.sharePlaylistUrl}/${shareWithUserId}/playlists`,
      { playlist_id: playlistId, shared_with_user_id: shareWithUserId },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  }

  //Get Playlists Shared with Me
  getPlaylistsSharedWithMe(): Observable<PlaylistDto[]> {
    const token = localStorage.getItem('access_token');
    return this.http.get<PlaylistDto[]>(
      `${this.sharePlaylistUrl}/received`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  }
}
