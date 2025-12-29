import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { UsersService } from '../services/users.service';
import { 
  registerUser, 
  registerUserSuccess, 
  registerUserFailure,
  updateUser,
  updateUserSuccess,
  updateUserFailure
} from '../actions';
import { CreateUserDto } from '../models/create-user.dto';
import { UserDto } from '../models/user.dto';
import { Router } from '@angular/router';
import { setAuthUser } from '../../Auth/actions';

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

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      switchMap((action: { userId: number; updateData: any }) =>
        this.usersService.updateUser(action.userId, action.updateData).pipe(
          map((user: UserDto) => {
            // Actualiza ambos estados
            return updateUserSuccess({ user });
          }),
          catchError((error) => of(updateUserFailure({ payload: error })))
        )
      )
    )
  );

  // Nuevo effect para sincronizar authState
  syncAuthUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUserSuccess),
      tap(({ user }) => console.log('syncAuthUser$', user)), // <-- Añade esto
      map(({ user }) => setAuthUser({ user }))
    )
  );

  redirectAfterUpdate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateUserSuccess),
        tap(() => {
          this.router.navigate(['/home']);
        })
      ),
    { dispatch: false }
  )
}