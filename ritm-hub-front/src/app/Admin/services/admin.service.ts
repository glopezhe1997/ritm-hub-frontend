import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { StatisticsAppDto } from '../Models/statistics-app.dto';
import { HttpClient } from '@angular/common/http';
import { UserDto } from '../../Users/models/user.dto';

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

  // Activate user
  activateUser(userId: number): Observable<{ message: string, user: UserDto | null }> {
    const token = localStorage.getItem('access_token');
    return this.http.patch<{ message: string, user: UserDto | null }>(`${this.url}/users/activate/${userId}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // Deactivate user
  deactivateUser(userId: number): Observable<{ message: string, user: UserDto | null }> {
    const token = localStorage.getItem('access_token');
    return this.http.patch<{ message: string, user: UserDto | null }>(
      `${this.url}/users/deactivate/${userId}`, {}, { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  // Block user
  blockUser(userId: number): Observable<{ message: string, user: UserDto | null }> {
    const token = localStorage.getItem('access_token');
    return this.http.patch<{ message: string, user: UserDto | null }>(
      `${this.url}/users/block/${userId}`, {}, { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  // Unblock user
  unblockUser(userId: number): Observable<{ message: string, user: UserDto | null }> {
    const token = localStorage.getItem('access_token');
    return this.http.patch<{ message: string, user: UserDto | null }>(
      `${this.url}/users/unblock/${userId}`, {}, { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  // Change user role
    changeUserRole(userId: number, role: string): Observable<{ message: string, user: UserDto | null }> {
    const token = localStorage.getItem('access_token');
    return this.http.patch<{ message: string, user: UserDto | null }>(
      `${this.url}/users/role/${userId}/${role}`, {}, { headers: { Authorization: `Bearer ${token}` } }
    );
  }
}
