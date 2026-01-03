import { Action, createReducer, on } from '@ngrx/store';
import { getStatistics, getStatisticsSuccess, getStatisticsFailure } from '../actions';
import { StatisticsAppDto } from '../Models/statistics-app.dto';

export interface AdminState {
  statistics: StatisticsAppDto | null;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: AdminState = {
  statistics: null,
  loading: false,
  loaded: false,
  error: null,
};

const _adminReducer = createReducer(
  initialState,
  // Get Global App Statistics
  on(getStatistics, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getStatisticsSuccess, (state, action) => ({
    ...state,
    statistics: action.statistics,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getStatisticsFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  }))
);

export function adminReducer(
    state: AdminState | undefined,
    action: Action
    ): AdminState {
    return _adminReducer(state, action);
    }
