import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUserDto } from '../models/create-user.dto';
import { Observable } from 'rxjs';
import { UserDto } from '../models/user.dto';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  registerUser(user: CreateUserDto): Observable<UserDto> {
    return this.http.post<UserDto>( this.url, user);
  }
}
