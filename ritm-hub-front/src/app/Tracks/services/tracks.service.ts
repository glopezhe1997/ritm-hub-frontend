import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TrackDto } from '../Models/track.dto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TracksService {
  private url = `${environment.apiUrl}/tracks`;
  private searchUrl = `${environment.apiUrl}/spotify/search`;

  constructor(private http: HttpClient) { }

  getTrendingTracks(): Observable<TrackDto[]> {
    const endpoint = this.url + '/trending';
    return this.http.get<TrackDto[]>(endpoint);
  }

  searchTracks(query: string): Observable<TrackDto[]> {
    const endpoint = `${this.searchUrl}?q=${encodeURIComponent(query)}&type=track`;
    return this.http.get<{ tracks: TrackDto[] }>(endpoint).pipe(
      map(response => response.tracks ?? [])
    );
  }
}
