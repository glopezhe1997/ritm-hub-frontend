import { createReducer, on } from '@ngrx/store';
import * as TrackActions from '../actions/track.action';
import { TrackDto } from '../Models/track.dto';

export interface TrackState {
  tracks: TrackDto[];
  track: TrackDto | null;
  loading: boolean;
  error: any;
}

export const initialState: TrackState = {
  tracks: [],
  track: null,
  loading: false,
  error: null
};

export const tracksReducer = createReducer(
  initialState,
  on(TrackActions.getTrendingTracks, (state) => ({
    ...state,
    loading: true
  })),
  on(TrackActions.getTrendingTracksSuccess, (state, { tracks }) => ({
    ...state,
    tracks,
    loading: false,
    error: null
  })),
  on(TrackActions.getTrendingTracksFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  })),
  //Search Tracks
  on(TrackActions.searchTracks, (state) => ({
    ...state,
    loading: true
  })),
  on(TrackActions.getTrendingTracksSuccess, (state, { tracks }) => ({
    ...state,
    tracks,
    loading: false,
    error: null
  })),
  on(TrackActions.getTrendingTracksFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  })),
);
