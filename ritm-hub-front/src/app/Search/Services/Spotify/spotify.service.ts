import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private url = `${environment.apiUrl}/spotify`;

  constructor(
    private http: HttpClient,
  ) { }

  search(q: string): Observable<any> {
    const type = ['artist', 'album', 'track', 'playlist'].join(',');
    const endpoint = `${this.url}/search?q=${encodeURIComponent(q)}`;
    return this.http.get<any>(endpoint);
  }

  postSearch(id: string, type: string): Observable<any> {
    const endpoint = `${this.url}/select`;
    return this.http.post<any>(endpoint, { external_id: id, type });
  }
}
