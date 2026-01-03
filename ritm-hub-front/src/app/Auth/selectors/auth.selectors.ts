import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { jwtDecode } from 'jwt-decode';

export const selectAuthState = (state: AppState) => state.authState;

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (authState) => !!authState.access_token
);

export const selectAccessToken = createSelector(
  selectAuthState,
  (authState) => authState.access_token
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (authState) => authState.loading
);

export const selectAuthError = createSelector(
  selectAuthState,
  (authState) => authState.error
);

export const isAdmin = createSelector(
  selectAuthState,
  (authState) => {
    if (!authState.access_token) {
      return false;
    }
    const payload: any = jwtDecode(authState.access_token);
    return payload.role === 'admin';
  }
);