import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrackDto } from '../Models/track.dto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TracksService {
  private url = `${environment.apiUrl}/tracks`;

  constructor(private http: HttpClient) { }

  getTrendingTracks(): Observable<TrackDto[]> {
    const endpoint = this.url + '/trending';
    return this.http.get<TrackDto[]>(endpoint);
  }
}
