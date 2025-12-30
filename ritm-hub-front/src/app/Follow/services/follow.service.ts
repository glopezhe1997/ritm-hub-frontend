import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FollowService {
  private url = `${environment.apiUrl}/follows`;

  constructor(private http: HttpClient) { }

  //Follow User
  followUser(followData: { follower_Id: number; followee_Id: number }) {
    const token = localStorage.getItem('access_token');
    return this.http.post<{ response: string; user: any }>(
      `${this.url}/follow`,
      followData,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  }

  //Unfollow User
  unfollowUser(followData: { follower_Id: number; followee_Id: number }) {
    const token = localStorage.getItem('access_token');
    return this.http.post<{ response: string; user: any }>(
      `${this.url}/unfollow`,
      followData,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  }
}
