import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlbumDto } from '../Models/album.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  private url = 'http://localhost:3000/albums';

  constructor(private http: HttpClient) { }

  getTrendingAlbums(): Observable<AlbumDto[]> {
    const endpoint = `${this.url}/trending`;
    return this.http.get<AlbumDto[]>(endpoint);
  }
}
