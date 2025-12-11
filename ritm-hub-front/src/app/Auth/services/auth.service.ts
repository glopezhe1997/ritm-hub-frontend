import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignInDto } from '../Models/sign-in.dto';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = `${environment.apiUrl}/auth`;
  
  constructor(private http: HttpClient) { }

  login(credentials: SignInDto) {
    return this.http.post<{ access_token: string }>(`${this.url}/login`, credentials);
  }
}
