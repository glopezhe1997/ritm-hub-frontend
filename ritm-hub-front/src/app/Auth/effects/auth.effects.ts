import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { login, loginSuccess, loginFailure, logout } from '../actions/auth.action';
import { SignInDto } from '../Models/sign-in.dto';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map(res => loginSuccess({ access_token: res.access_token })),
          catchError(error => of(loginFailure({ payload: error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(({ access_token }) => {
          localStorage.setItem('access_token', access_token);
          this.router.navigate(['/home']);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
  () =>
    this.actions$.pipe(
      ofType(logout),
      tap(() => {
        localStorage.removeItem('access_token');
        this.router.navigate(['/Home']);
      })
    ),
  { dispatch: false }
);

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}