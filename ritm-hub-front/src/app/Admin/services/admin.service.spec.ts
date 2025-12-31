import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AdminService } from './admin.service';
import { environment } from '../../../environments/environment';
import { StatisticsAppDto } from '../Models/statistics-app.dto';
import { UserDto } from '../../Users/models/user.dto';

describe('AdminService', () => {
  let service: AdminService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/admin`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminService]
    });
    service = TestBed.inject(AdminService);
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

  it('should get statistics', () => {
    const mockStats: StatisticsAppDto = {
      totalUsers: 10,
      totalActiveUsers: 8,
      totalInactiveUsers: 2,
      totalPlaylists: 5,
      totalPublicPlaylists: 3,
      totalPrivatePlaylists: 2
    };
    localStorage.setItem('access_token', 'fake-token');

    service.getStatistics().subscribe(stats => {
      expect(stats).toEqual(mockStats);
    });

    const req = httpMock.expectOne(`${apiUrl}/statistics`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');
    req.flush(mockStats);
  });

  it('should activate user', () => {
    const userId = 1;
    const mockUser: UserDto = {
      id: 1,
      name: 'Test User',
      email: 'test@mail.com',
      username: 'testuser',
      Birthdate: new Date('2000-01-01'),
      role: 'user',
      isActive: true,
      isBlocked: false,
      createdAt: new Date('2023-01-01')
    };
    const mockResponse = { message: 'User activated', user: mockUser };
    localStorage.setItem('access_token', 'fake-token');

    service.activateUser(userId).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/users/activate/${userId}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');
    req.flush(mockResponse);
  });

  it('should deactivate user', () => {
    const userId = 2;
    const mockUser: UserDto = {
      id: 2,
      name: 'Test User 2',
      email: 'test2@mail.com',
      username: 'testuser2',
      Birthdate: new Date('2001-01-01'),
      role: 'user',
      isActive: false,
      isBlocked: false,
      createdAt: new Date('2023-01-01')
    };
    const mockResponse = { message: 'User deactivated', user: mockUser };
    localStorage.setItem('access_token', 'fake-token');

    service.deactivateUser(userId).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/users/deactivate/${userId}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');
    req.flush(mockResponse);
  });

  it('should block user', () => {
    const userId = 3;
    const mockUser: UserDto = {
      id: 3,
      name: 'Test User 3',
      email: 'test3@mail.com',
      username: 'testuser3',
      Birthdate: new Date('2002-01-01'),
      role: 'user',
      isActive: true,
      isBlocked: true,
      createdAt: new Date('2023-01-01')
    };
    const mockResponse = { message: 'User blocked', user: mockUser };
    localStorage.setItem('access_token', 'fake-token');

    service.blockUser(userId).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/users/block/${userId}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');
    req.flush(mockResponse);
  });

  it('should unblock user', () => {
    const userId = 4;
    const mockUser: UserDto = {
      id: 4,
      name: 'Test User 4',
      email: 'test4@mail.com',
      username: 'testuser4',
      Birthdate: new Date('2003-01-01'),
      role: 'user',
      isActive: true,
      isBlocked: false,
      createdAt: new Date('2023-01-01')
    };
    const mockResponse = { message: 'User unblocked', user: mockUser };
    localStorage.setItem('access_token', 'fake-token');

    service.unblockUser(userId).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/users/unblock/${userId}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');
    req.flush(mockResponse);
  });

  it('should change user role', () => {
    const userId = 5;
    const role = 'admin';
    const mockUser: UserDto = {
      id: 5,
      name: 'Test User 5',
      email: 'test5@mail.com',
      username: 'testuser5',
      Birthdate: new Date('2004-01-01'),
      role: 'admin',
      isActive: true,
      isBlocked: false,
      createdAt: new Date('2023-01-01')
    };
    const mockResponse = { message: 'Role changed', user: mockUser };
    localStorage.setItem('access_token', 'fake-token');

    service.changeUserRole(userId, role).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/users/role/${userId}/${role}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');
    req.flush(mockResponse);
  });
});