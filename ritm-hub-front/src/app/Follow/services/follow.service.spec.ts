import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FollowService } from './follow.service';
import { environment } from '../../../environments/environment';
import { UserDto } from '../../Users/models/user.dto';

describe('FollowService', () => {
  let service: FollowService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/follows`;

  // Mock completo de UserDto
  const mockUser: UserDto = {
    id: 2,
    name: 'Test User',
    email: 'test2@email.com',
    username: 'testuser2',
    Birthdate: new Date('2000-01-01'),
    role: 'user',
    createdAt: new Date('2024-01-01'),
    isActive: true,
    isBlocked: false
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FollowService]
    });
    service = TestBed.inject(FollowService);
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

  it('should send POST to follow user with Authorization header', () => {
    const followData = { follower_Id: 1, followee_Id: 2 };
    const mockResponse = { response: 'Followed', user: mockUser };
    localStorage.setItem('access_token', 'test-token');

    service.followUser(followData).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/follow`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    expect(req.request.body).toEqual(followData);
    req.flush(mockResponse);
  });

  it('should send POST to unfollow user with Authorization header', () => {
    const followData = { follower_Id: 1, followee_Id: 2 };
    const mockResponse = { response: 'Unfollowed', user: mockUser };
    localStorage.setItem('access_token', 'test-token');

    service.unfollowUser(followData).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/unfollow`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    expect(req.request.body).toEqual(followData);
    req.flush(mockResponse);
  });

  it('should send GET to get following users with Authorization header', () => {
    const userId = 1;
    const mockUsers: UserDto[] = [
      mockUser,
      {
        id: 3,
        name: 'Another User',
        email: 'another@email.com',
        username: 'anotheruser',
        Birthdate: new Date('1999-05-05'),
        role: 'user',
        createdAt: new Date('2024-02-02'),
        isActive: true,
        isBlocked: false
      }
    ];
    localStorage.setItem('access_token', 'test-token');

    service.getFollowingUsers(userId).subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(`${apiUrl}/followees/${userId}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    req.flush(mockUsers);
  });
});