import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { environment } from '../../../environments/environment';
import { CreateUserDto } from '../models/create-user.dto';
import { UserDto } from '../models/user.dto';
import { UpdateUserDto } from '../models/update-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/users`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService]
    });
    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user', () => {
    const user: CreateUserDto = new CreateUserDto('Test', new Date(), 'test@mail.com', 'pass', 'testuser');
    const mockResponse: UserDto = { id: 1, name: 'Test', Birthdate: new Date(), email: 'test@mail.com', username: 'testuser', role: 'user', createdAt: new Date() };

    service.registerUser(user).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(user);
    req.flush(mockResponse);
  });

  it('should search users', () => {
    const query = 'test';
    const mockResponse: UserDto[] = [
      { id: 1, name: 'Test', Birthdate: new Date(), email: 'test@mail.com', username: 'testuser', role: 'user', createdAt: new Date() }
    ];
    localStorage.setItem('access_token', 'fake-token');

    service.searchUsers(query).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(r =>
      r.url === `${apiUrl}/search` && r.params.get('q') === query
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');
    req.flush(mockResponse);
  });

  it('should update a user', () => {
    const userId = 1;
    const updateData: UpdateUserDto = { name: 'Updated' } as any;
    const mockResponse: UserDto = { id: 1, name: 'Updated', Birthdate: new Date(), email: 'test@mail.com', username: 'testuser', role: 'user', createdAt: new Date() };
    localStorage.setItem('access_token', 'fake-token');

    service.updateUser(userId, updateData).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/${userId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');
    expect(req.request.body).toEqual(updateData);
    req.flush(mockResponse);
  });
});