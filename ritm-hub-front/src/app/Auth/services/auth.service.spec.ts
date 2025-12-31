import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SignInDto } from '../Models/sign-in.dto';
import { environment } from '../../../environments/environment';
import { jwtDecodeWrapper } from '../wrapper/jwt-decode.wrapper';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and return access_token', () => {
    const credentials: SignInDto = { email: 'test@gmail.com', password: '1234' };
    const mockResponse = { access_token: 'fake-token' };

    service.login(credentials).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(credentials);
    req.flush(mockResponse);
  });

  it('should return false for hasRole if no token', () => {
    localStorage.removeItem('access_token');
    expect(service.hasRole('admin')).toBeFalse();
  });
  
  it('should return true for hasRole if token has correct role', () => {
    const fakeToken = 'fake.jwt.token';
    localStorage.setItem('access_token', fakeToken);
    spyOn(jwtDecodeWrapper, 'decodeJwt').and.returnValue({ role: 'admin' } as any);
  
    expect(service.hasRole('admin')).toBeTrue();
    expect(jwtDecodeWrapper.decodeJwt).toHaveBeenCalledWith(fakeToken);
  });
  
  it('should return false for hasRole if token has different role', () => {
    const fakeToken = 'fake.jwt.token';
    localStorage.setItem('access_token', fakeToken);
    spyOn(jwtDecodeWrapper, 'decodeJwt').and.returnValue({ role: 'user' } as any);
  
    expect(service.hasRole('admin')).toBeFalse();
    expect(jwtDecodeWrapper.decodeJwt).toHaveBeenCalledWith(fakeToken);
  });

  it('should return true for isAuthenticated if token exists', () => {
    localStorage.setItem('access_token', 'token');
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should return false for isAuthenticated if token does not exist', () => {
    localStorage.removeItem('access_token');
    expect(service.isAuthenticated()).toBeFalse();
  });
});