import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignInDto } from '../Models/sign-in.dto';
import { environment } from '../../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { jwtDecodeWrapper } from '../wrapper/jwt-decode.wrapper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = `${environment.apiUrl}/auth`;
  
  constructor(private http: HttpClient) { }

  login(credentials: SignInDto) {
    return this.http.post<{ access_token: string }>(`${this.url}/login`, credentials);
  }

  hasRole(role: string): boolean {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return false;
    }

    const payload: any = jwtDecodeWrapper.decodeJwt(token);
    return payload.role === role;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token;
  }
}
