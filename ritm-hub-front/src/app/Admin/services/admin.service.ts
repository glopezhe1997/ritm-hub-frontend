import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { StatisticsAppDto } from '../Models/statistics-app.dto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private url = environment.apiUrl + '/admin';

  constructor(private http: HttpClient) { }

  getStatistics(): Observable<StatisticsAppDto> {
    const token = localStorage.getItem('access_token');
    const endpoint = this.http.get<StatisticsAppDto>(`${this.url}/statistics`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return endpoint;
  }
}
