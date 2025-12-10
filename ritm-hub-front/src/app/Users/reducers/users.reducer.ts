import { Action, createReducer, on } from '@ngrx/store';
import { registerUser, registerUserFailure, registerUserSuccess } from '../actions';
import { CreateUserDto } from '../models/create-user.dto';
import { UserDto } from '../models/user.dto';

export interface UsersState {
    creatingUser: boolean;
    createdUser: boolean;
    error: any;
    user?: UserDto;
}

export const initialState: UsersState = {
    creatingUser: false,
    createdUser: false,
    error: null
};

const _usersReducer = createReducer(
    initialState,
    on(registerUser, (state) => ({
        ...state,
        creatingUser: true,
        createdUser: false,
        error: null
    })),
    on(registerUserSuccess, (state, { user }) => ({
        ...state,
        creatingUser: false,
        createdUser: true,
        error: null,
        user
    })),
    on(registerUserFailure, (state, { payload }) => ({
        ...state,
        creatingUser: false,
        createdUser: false,
        error: payload
    }))
);

export function usersReducer(state: UsersState | undefined, action: Action) {
    return _usersReducer(state, action);
}