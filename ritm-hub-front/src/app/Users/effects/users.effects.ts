import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { UsersService } from '../services/users.service';
import { registerUser, registerUserSuccess, registerUserFailure } from '../actions';
import { CreateUserDto } from '../models/create-user.dto';
import { UserDto } from '../models/user.dto';
import { Router } from '@angular/router';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private router: Router
  ) {}

  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUser),
      switchMap((action: { user: CreateUserDto }) =>
        this.usersService.registerUser(action.user).pipe(
          map((user: UserDto) => registerUserSuccess({ user })),
          catchError((error) => of(registerUserFailure({ payload: error })))
        )
      )
    )
  );

    redirectAfterRegister$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerUserSuccess),
        tap(() => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );
}