import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlbumDto } from '../Models/album.dto';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  private url = `${environment.apiUrl}/albums`;

  constructor(private http: HttpClient) { }

  getTrendingAlbums(): Observable<AlbumDto[]> {
    const endpoint = `${this.url}/trending`;
    return this.http.get<AlbumDto[]>(endpoint);
  }
}
