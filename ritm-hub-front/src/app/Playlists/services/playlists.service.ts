import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaylistDto } from '../Models/playlist.dto';
import { environment } from '../../../environments/environment';
import { UserDto } from '../../Users/models/user.dto';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {
  private url = `${environment.apiUrl}/playlists`;

  constructor(private http: HttpClient) { }

  getTrendingPlaylists(): Observable<PlaylistDto[]> {
    return this.http.get<PlaylistDto[]>(`${this.url}/trending`);
  }

  getUserPlaylists(): Observable<PlaylistDto[]> {
    const token = localStorage.getItem('token');
    return this.http.get<PlaylistDto[]>(`${this.url}/private`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
