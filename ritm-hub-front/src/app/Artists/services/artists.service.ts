import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArtistDto } from '../Models/artist.dto';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {

  private url = 'http://localhost:3000/artists';

  constructor(private http: HttpClient) { }

  getTrendingArtists(): Observable<ArtistDto[]> {
    const endpoint = `${this.url}/trending`;
    return this.http.get<ArtistDto[]>(endpoint);
  }
}
