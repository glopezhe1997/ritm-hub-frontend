import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUserDto } from '../models/create-user.dto';
import { Observable } from 'rxjs';
import { UserDto } from '../models/user.dto';
import { environment } from '../../../environments/environment';
import { UpdateUserDto } from '../models/update-user.dto';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  registerUser(user: CreateUserDto): Observable<UserDto> {
    return this.http.post<UserDto>( this.url, user);
  }

  // Search users by username or email
  searchUsers(query: string): Observable<UserDto[]> {
    const token = localStorage.getItem('access_token');
    return this.http.get<UserDto[]>(`${this.url}/search`, 
      { 
        params: { q: query },
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  }

  // Update User
  updateUser(userId: number, updateData: UpdateUserDto): Observable<UserDto> {
    const token = localStorage.getItem('access_token');
    return this.http.put<UserDto>(`${this.url}/${userId}`, updateData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
