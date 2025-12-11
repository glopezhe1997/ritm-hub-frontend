import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArtistDto } from '../Models/artist.dto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {

  private url = `${environment.apiUrl}/artists`;

  constructor(private http: HttpClient) { }

  getTrendingArtists(): Observable<ArtistDto[]> {
    const endpoint = `${this.url}/trending`;
    return this.http.get<ArtistDto[]>(endpoint);
  }
}
