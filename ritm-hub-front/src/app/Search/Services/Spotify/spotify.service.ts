import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private apiUrl = 'http://localhost:3000/spotify';

  constructor(
    private http: HttpClient,
  ) { }

  search(q: string): Observable<any> {
    const type = ['artist', 'album', 'track', 'playlist'].join(',');
    const endpoint = `${this.apiUrl}/search?q=${encodeURIComponent(q)}`;
    return this.http.get<any>(endpoint);
  }

  postSearch(id: string, type: string): Observable<any> {
    const endpoint = `${this.apiUrl}/select`;
    return this.http.post<any>(endpoint, { external_id: id, type });
  }
}
