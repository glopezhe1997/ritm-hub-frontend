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
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from '../../Shared/services/toast.service';

@Injectable()
export class FollowEffects {
  constructor(
    private actions$: Actions,
    private followService: FollowService,
    private toastService: ToastService
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

  // Toast notification on followUserSuccess

  followUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(followUserSuccess),
        tap((action: any) => {
          this.toastService.show(
            `You are now following ${action.user.username}!`,
            'success'
          );
        })
      ),
    { dispatch: false }
  );

  followUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(followUserFailure),
        tap((action: any) => {
          const msg =
            action.payload?.error?.message ||
            action.payload?.message ||
            'Error following user';
          this.toastService.show(msg, 'error');
        })
      ),
    { dispatch: false }
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

   unfollowUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(unfollowUserSuccess),
        tap(() => {
          this.toastService.show('You have unfollowed the user.', 'info');
        })
      ),
    { dispatch: false }
  );

  unfollowUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(unfollowUserFailure),
        tap((action: any) => {
          const msg =
            action.payload?.error?.message ||
            action.payload?.message ||
            'Error unfollowing user';
          this.toastService.show(msg, 'error');
        })
      ),
    { dispatch: false }
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