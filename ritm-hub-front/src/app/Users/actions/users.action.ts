import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { CreateUserDto } from '../models/create-user.dto';
import { UserDto } from '../models/user.dto';
import { UpdateUserDto } from '../models/update-user.dto';

// Register User
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

// Update User
export const updateUser = createAction(
  '[User Page] Update User',
  props<{ userId: number; updateData: UpdateUserDto }>()
);

export const updateUserSuccess = createAction(
  '[User Page] Update User Success',
  props<{ user: UserDto }>()
);

export const updateUserFailure = createAction(
  '[User Page] Update User Failure',
  props<{ payload: HttpErrorResponse }>()
);