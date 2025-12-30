import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from '../../Users/models/user.dto';
@Injectable({
  providedIn: 'root'
})
export class FollowService {
  private url = `${environment.apiUrl}/follows`;

  constructor(private http: HttpClient) { }

  //Follow User
  followUser(followData: { follower_Id: number; followee_Id: number }): Observable<{ response: string; user: UserDto }> {
    const token = localStorage.getItem('access_token');
    return this.http.post<{ response: string; user: UserDto }>(
      `${this.url}/follow`,
      followData,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  }

  //Unfollow User
  unfollowUser(followData: { follower_Id: number; followee_Id: number }): Observable<{ response: string; user: UserDto }> {
    const token = localStorage.getItem('access_token');
    return this.http.post<{ response: string; user: UserDto }>(
      `${this.url}/unfollow`,
      followData,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  }

  //Get Following Users
  getFollowingUsers(userId: number): Observable<UserDto[]> {
    const token = localStorage.getItem('access_token');
    return this.http.get<UserDto[]>(
      `${this.url}/followees/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  } 
}
