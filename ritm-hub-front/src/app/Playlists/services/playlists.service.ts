import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaylistDto } from '../Models/playlist.dto';
import { environment } from '../../../environments/environment';
import { UserDto } from '../../Users/models/user.dto';
import { PlaylistSpotifyDto } from '../Models/playlist-spotify.dto';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {
  private url = `${environment.apiUrl}/playlists`;

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
    return this.http.get<PlaylistDto[]>(`${this.url}/private`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  postCreateUserPlaylist(playlist: PlaylistDto): Observable<PlaylistDto> {
    const token = localStorage.getItem('access_token');
    return this.http.post<PlaylistDto>(
      `${this.url}/create`,
      { name: playlist.name },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  }
}
