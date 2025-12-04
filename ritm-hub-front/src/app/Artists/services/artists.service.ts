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

  getArtistByName(name: string): Observable<ArtistDto> {
    console.log('Fetching artist by name:', name);
    console.log('Request URL:', this.url + '/name/' + name);
    const artist = this.http.get<ArtistDto>(this.url + '/name/' + name);
    console.log('Received artist data:', artist);
    return artist;
  }
}
