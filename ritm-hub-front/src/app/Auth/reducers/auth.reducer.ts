import { Action, createReducer, on } from '@ngrx/store';
import { loadToken, login, loginFailure, loginSuccess, logout } from '../actions';
import { SignInDto } from '../Models/sign-in.dto';

export interface AuthState {
  credentials: SignInDto;
  access_token: string | null;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: AuthState = {
  credentials: new SignInDto('', ''),
  access_token: null,
  loading: false,
  loaded: true,
  error: null,
};

const _authReducer = createReducer(
  initialState,
  on(login, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(loginSuccess, (state, action) => ({
    ...state,
    access_token: action.access_token,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(loginFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(loadToken, (state, { access_token }) => ({
    ...state,
    access_token: access_token,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(logout, () => initialState)
);

export function authReducer(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return _authReducer(state, action);
}