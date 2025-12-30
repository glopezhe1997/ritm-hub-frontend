import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreatePostDto } from '../Models/create-post.dto';
import { Observable } from 'rxjs';
import { PostDto } from '../Models/post.dto';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private url = `${environment.apiUrl}/posts`;
  
  constructor(private http: HttpClient) { }

  // Create post
  createPost(createPostData: CreatePostDto): Observable<PostDto> {
    const token = localStorage.getItem('authToken') || '';
    return this.http.post<PostDto>(this.url, createPostData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Get my posts
  getMyPosts(): Observable<PostDto[]> {
    const token = localStorage.getItem('authToken') || '';
    return this.http.get<PostDto[]>(`${this.url}/my-posts`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
