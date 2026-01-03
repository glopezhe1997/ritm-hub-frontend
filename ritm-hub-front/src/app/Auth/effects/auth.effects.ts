import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { loadToken, login, loginSuccess, loginFailure, logout } from '../actions/auth.action';
import { SignInDto } from '../Models/sign-in.dto';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UserDto } from '../../Users/models/user.dto';
import { ToastService } from '../../Shared/services/toast.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map(res => {
            const payload: any = jwtDecode(res.access_token);
            const user: UserDto = {
              id: payload.sub || payload.id || payload.userId,
              username: payload.username || payload.name || '',
              email: payload.email || '',
              role: payload.role,
              Birthdate: payload.Birthdate || '', 
              name: payload.name || '',
              createdAt: payload.createdAt || '',
            };
            return loginSuccess({ access_token: res.access_token, user, fromLoadToken: false });
          }),
          catchError(error => of(loginFailure({ payload: error })))
        )
      )
    )
  );

  // 
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(({ access_token, fromLoadToken }) => {
          localStorage.setItem('access_token', access_token);
          if( !fromLoadToken ) {
            console.log('Navigating to /home after login');
            this.toastService.show('Welcome to RitmHub.', 'success');
            this.router.navigate(['/home']);
          }
        })
      ),
    { dispatch: false }
  );

    loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginFailure),
        tap((action) => {
          const msg =
            action.payload?.error?.message ||
            action.payload?.message ||
            'Login failed. Please try again.';
          this.toastService.show(msg, 'error');
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
        this.router.navigate(['/home']);
      })
    ),
  { dispatch: false }
);

  loadToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadToken),
      map(({ access_token }) => {
        const payload: any = jwtDecode(access_token);
        const user: UserDto = {
          id: payload.sub || payload.id || payload.userId,
          username: payload.username || payload.name || '',
          email: payload.email || '',
          role: payload.role || 'user',
          Birthdate: payload.Birthdate || '',
          name: payload.name || '',
          createdAt: payload.createdAt || '',
        };
        return loginSuccess({ access_token, user, fromLoadToken: true });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}
}
