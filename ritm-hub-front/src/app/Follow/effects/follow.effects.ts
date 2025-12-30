import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FollowService } from '../services/follow.service';
import {
  followUser,
  followUserSuccess,
  followUserFailure,
  unfollowUser,
  unfollowUserSuccess,
  unfollowUserFailure,
  getFollowingUsers,
  getFollowingUsersSuccess,
  getFollowingUsersFailure
} from '../actions/follow.action';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class FollowEffects {
  constructor(
    private actions$: Actions,
    private followService: FollowService
  ) {}

  followUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(followUser),
      switchMap((action: any) =>
        this.followService.followUser(action.followData).pipe(
          map(response =>
            followUserSuccess({ response: response.response, user: response.user })
          ),
          catchError(error => of(followUserFailure({ payload: error })))
        )
      )
    )
  );

  unfollowUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(unfollowUser),
      switchMap((action: any) =>
        this.followService.unfollowUser(action.followData).pipe(
          // El backend no devuelve el id, así que lo tomamos del followData
          map(() =>
            unfollowUserSuccess({ userId: action.followData.followee_Id })
          ),
          catchError(error => of(unfollowUserFailure({ payload: error })))
        )
      )
    )
  );

  getFollowingUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFollowingUsers),
      switchMap((action: any) =>
        this.followService.getFollowingUsers(action.userId).pipe(
          map(users =>
            getFollowingUsersSuccess({ users })
          ),
          catchError(error => of(getFollowingUsersFailure({ payload: error })))
        )
      )
    )
  ); 
  
}