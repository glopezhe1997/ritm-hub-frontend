import { Action, createReducer, on } from '@ngrx/store';
import { 
    registerUser, 
    registerUserFailure, 
    registerUserSuccess,
    updateUser,
    updateUserFailure,
    updateUserSuccess
} from '../actions';
import { CreateUserDto } from '../models/create-user.dto';
import { UserDto } from '../models/user.dto';

export interface UsersState {
    creatingUser: boolean;
    createdUser: boolean;
    updatingUser: boolean;
    updatedUser: boolean;
    error: any;
    user?: UserDto;
}

export const initialState: UsersState = {
    creatingUser: false,
    createdUser: false,
    updatingUser: false,
    updatedUser: false,
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
    })),
    // Update User
    on(updateUser, (state) => ({
        ...state,
        updatingUser: true,
        updatedUser: false,
        error: null
    })),
    on(updateUserSuccess, (state, { user }) => ({
        ...state,
        updatingUser: false,
        updatedUser: true,
        error: null,
        user
    })),
    on(updateUserFailure, (state, { payload }) => ({
        ...state,
        updatingUser: false,
        updatedUser: false,
        error: payload
    }))
);

export function usersReducer(state: UsersState | undefined, action: Action) {
    return _usersReducer(state, action);
}