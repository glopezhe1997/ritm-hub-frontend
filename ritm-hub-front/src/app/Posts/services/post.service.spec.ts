import { TestBed } from '@angular/core/testing';
import { PostsService } from './posts.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CreatePostDto } from '../Models/create-post.dto';
import { PostDto, PostStatus } from '../Models/post.dto';
import { environment } from '../../../environments/environment';

describe('PostsService', () => {
  let service: PostsService;
  let httpMock: HttpTestingController;

  const mockPost: PostDto = {
    post_id: 1,
    title: 'Test Post',
    content: 'Content',
    status: PostStatus.HAPPY,
    owner: {
      id: 1,
      username: 'user',
      email: 'user@mail.com',
      name: 'User',
      role: 'user',
      createdAt: new Date(),
      Birthdate: new Date(),
    },
    createdAt: new Date(),
    track: {
      id: 1,
      title: 'Track',
      album: { name: 'Album', images: [{ url: 'img.jpg', height: 100, width: 100 }] },
      artists: [{ name: 'Artist' }],
      duration_ms: 123000,
      popularity: 50,
      preview_url: 'url',
      external_id: 'extid'
    }
  };

  const mockCreatePost: CreatePostDto = {
    title: 'Test Post',
    content: 'Content',
    status: PostStatus.HAPPY,
    track_id: '1'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostsService]
    });
    service = TestBed.inject(PostsService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.setItem('authToken', 'test-token');
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a post', () => {
    service.createPost(mockCreatePost).subscribe(post => {
      expect(post).toEqual(mockPost);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/posts/create-post`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    expect(req.request.body).toEqual(mockCreatePost);
    req.flush(mockPost);
  });

  it('should get my posts', () => {
    service.getMyPosts().subscribe(posts => {
      expect(posts).toEqual([mockPost]);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/posts/my-posts`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    req.flush([mockPost]);
  });

  it('should get my post by id', () => {
    service.getMyPostById(1).subscribe(post => {
      expect(post).toEqual(mockPost);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/posts/my-posts/1`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    req.flush(mockPost);
  });

  it('should get my feed', () => {
    service.getMyFeed().subscribe(posts => {
      expect(posts).toEqual([mockPost]);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/posts/feed`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    req.flush([mockPost]);
  });
});