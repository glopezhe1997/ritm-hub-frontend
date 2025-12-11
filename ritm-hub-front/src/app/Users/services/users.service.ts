import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUserDto } from '../models/create-user.dto';
import { Observable } from 'rxjs';
import { UserDto } from '../models/user.dto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  registerUser(user: CreateUserDto): Observable<UserDto> {
    return this.http.post<UserDto>( this.url, user);
  }
}
