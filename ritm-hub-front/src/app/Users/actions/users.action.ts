import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { CreateUserDto } from '../models/create-user.dto';
import { UserDto } from '../models/user.dto';

export const registerUser = createAction(
  '[Register Page] Register User',
  props<{ user: CreateUserDto }>()
);

export const registerUserSuccess = createAction(
  '[Register Page] Register User Success',
  props<{ user: UserDto }>()
);

export const registerUserFailure = createAction(
  '[Register Page] Register User Failure',
  props<{ payload: HttpErrorResponse }>()
);