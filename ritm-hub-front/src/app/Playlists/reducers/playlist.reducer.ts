import { createReducer, on } from '@ngrx/store';
import * as PlaylistActions from '../actions/playlist.action';
import { PlaylistDto } from '../Models/playlist.dto';

export interface PlaylistState {
  playlists: PlaylistDto[];
  playlist: PlaylistDto | null;
  loading: boolean;
  error: any;
}

export const initialState: PlaylistState = {
  playlists: [],
  playlist: null,
  loading: false,
  error: null
};

export const playlistsReducer = createReducer(
  initialState,
  on(PlaylistActions.getTrendingPlaylists, (state) => ({
    ...state,
    loading: true
  })),
  on(PlaylistActions.getTrendingPlaylistsSuccess, (state, { playlists }) => ({
    ...state,
    playlists,
    loading: false,
    error: null
  })),
  on(PlaylistActions.getTrendingPlaylistsFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  })),
  on(PlaylistActions.getUserPlaylists, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(PlaylistActions.getUserPlaylistsSuccess, (state, { playlists }) => ({
    ...state,
    playlists,
    loading: false,
    error: null
  })),
  on(PlaylistActions.getUserPlaylistsFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  })),
);
