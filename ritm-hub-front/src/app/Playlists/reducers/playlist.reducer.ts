import { createReducer, on } from '@ngrx/store';
import * as PlaylistActions from '../actions/playlist.action';
import { PlaylistDto } from '../Models/playlist.dto';
import { PlaylistSpotifyDto } from '../Models/playlist-spotify.dto';

export interface PlaylistState {
  playlists: PlaylistDto[]; // Playlists del usuario
  trendingPlaylists: PlaylistSpotifyDto[]; // Playlists de Spotify
  playlist: PlaylistDto | null;
  loading: boolean;
  error: any;
}

export const initialState: PlaylistState = {
  playlists: [],
  trendingPlaylists: [],
  playlist: null,
  loading: false,
  error: null
};

export const playlistsReducer = createReducer(
  initialState,
  // Trending Playlists (Spotify)
  on(PlaylistActions.getTrendingPlaylists, (state) => ({
    ...state,
    loading: true
  })),
  on(PlaylistActions.getTrendingPlaylistsSuccess, (state, { playlists }) => ({
    ...state,
    trendingPlaylists: playlists, // <-- Guarda en trendingPlaylists
    loading: false,
    error: null
  })),
  on(PlaylistActions.getTrendingPlaylistsFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  })),
  // User Playlists
  on(PlaylistActions.getUserPlaylists, (state) => ({
    ...state,
    playlists: [],
    loading: true,
    error: null
  })),
  on(PlaylistActions.getUserPlaylistsSuccess, (state, { playlists }) => ({
    ...state,
    playlists, // <-- Guarda en playlists
    loading: false,
    error: null
  })),
  on(PlaylistActions.getUserPlaylistsFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  })),
  // Create Playlist
  on(PlaylistActions.postCreateUserPlaylist, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(PlaylistActions.postCreateUserPlaylistSuccess, (state, { playlist }) => ({
    ...state,
    playlists: [...state.playlists, playlist],
    loading: false,
    error: null
  })),
  on(PlaylistActions.postCreateUserPlaylistFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  }))
);