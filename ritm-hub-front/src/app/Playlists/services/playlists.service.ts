import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaylistDto } from '../Models/playlist.dto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {
  private url = 'http://localhost:3000/playlists';

  constructor(private http: HttpClient) { }

  getTrendingPlaylists(): Observable<PlaylistDto[]> {
    return this.http.get<PlaylistDto[]>(`${this.url}/trending`);
  }
}
