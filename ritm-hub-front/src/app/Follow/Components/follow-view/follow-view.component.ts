import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../../Search/Components/search-bar/search-bar.component';
import { FollowButtonControllerComponent } from '../follow-button-controller/follow-button-controller.component';
import { UsersService } from '../../../Users/services/users.service';
import { UserDto } from '../../../Users/models/user.dto';
import { Store } from '@ngrx/store';
import { followUser, unfollowUser } from '../../actions/follow.action';
import { AppState } from '../../../app.reducer';
import { getFollowingUsers } from '../../actions/follow.action';
@Component({
  selector: 'app-follow-view',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, FollowButtonControllerComponent],
  templateUrl: './follow-view.component.html',
  styleUrl: './follow-view.component.css'
})
export class FollowViewComponent implements OnInit{
  users: UserDto[] = [];
  followingIds: number[] = [];
  followingUsers: UserDto[] = [];
  loading: boolean = false;

  constructor(
    private usersService: UsersService,
    private store: Store<AppState>
  ) {
    // Suscríbete al estado de usuarios seguidos
    this.store.select('followState').subscribe(followState => {
      this.followingIds = followState.usersFollowing.map(u => u.id);
        this.followingUsers = followState.usersFollowing;
      this.loading = followState.loading;
    });
  }

  ngOnInit(): void {
    this.store.select('authState').subscribe(authState => {
      const myId = authState.user?.id;
      if (myId) {
        this.store.dispatch(getFollowingUsers({ userId: myId }));
      }
    });
  }

  onSearch(query: string) {
    if (!query) {
      this.users = [];
      return;
    }
    this.loading = true;
    this.usersService.searchUsers(query).subscribe({
      next: users => {
        this.users = users;
        this.loading = false;
      },
      error: () => {
        this.users = [];
        this.loading = false;
      }
    });
  }

  onFollowChange(user: UserDto, isFollowing: boolean) {
    if (isFollowing) {
      this.store.dispatch(followUser({ followData: { followee_Id: user.id } }));
    } else {
      this.store.dispatch(unfollowUser({ followData: { followee_Id: user.id } }));
    }
  }

  isFollowing(userId: number): boolean {
    return this.followingIds.includes(userId);
  }
}