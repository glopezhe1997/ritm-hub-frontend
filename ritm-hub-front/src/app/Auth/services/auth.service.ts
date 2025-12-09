import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignInDto } from '../Models/sign-in.dto';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:3000/auth';
  constructor(private http: HttpClient) { }

  login(credentials: SignInDto) {
    return this.http.post<{ access_token: string }>(`${this.url}/login`, credentials);
  }
}
