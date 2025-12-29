import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { SignInDto } from '../Models/sign-in.dto';
import { UserDto } from '../../Users/models/user.dto';

export const login = createAction(
  '[Login Page] Login',
  props<{ credentials: SignInDto }>()
);

export const loginSuccess = createAction(
  '[Login Page] Login Success',
  props<{ access_token: string, user: UserDto }>()
);

export const loginFailure = createAction(
  '[Login Page] Login Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const loadToken = createAction(
  '[Auth] Load Token',
  props<{ access_token: string }>()
);

export const setAuthUser = createAction(
  '[Auth] Set Auth User',
  props<{ user: UserDto }>()
);

export const logout = createAction('[Login Page] Logout');