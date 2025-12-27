import { createReducer, on } from '@ngrx/store';
import * as PlaylistActions from '../actions/playlist.action';
import { PlaylistDto } from '../Models/playlist.dto';
import { PlaylistSpotifyDto } from '../Models/playlist-spotify.dto';

export interface PlaylistState {
  playlists: PlaylistDto[]; // Playlists del usuario
  trendingPlaylists: PlaylistSpotifyDto[]; // Playlists de Spotify
  playlist: PlaylistDto | null;
  sharedPlalistsWithMe: PlaylistDto[]; // Playlists compartidas conmigo
  loading: boolean;
  error: any;
}

export const initialState: PlaylistState = {
  playlists: [],
  trendingPlaylists: [],
  playlist: null,
  sharedPlalistsWithMe: [],
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
  })),
  on(PlaylistActions.getPlaylistById, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(PlaylistActions.getPlaylistByIdSuccess, (state, { playlist }) => ({
    ...state,
    playlist,
    loading: false,
    error: null
  })),
  on(PlaylistActions.getPlaylistByIdFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  })),
  //Delete Playlist
  on(PlaylistActions.deleteUserPlaylist, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(PlaylistActions.deleteUserPlaylistSuccess, (state, { playlistId }) => ({
    ...state,
    playlists: state.playlists.filter(p => p.playlist_id !== playlistId),
    loading: false,
    error: null
  })),
  on(PlaylistActions.deleteUserPlaylistFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  })),
  //Add Track to Playlist
  on(PlaylistActions.addTrackToPlaylist, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(PlaylistActions.addTrackToPlaylistSuccess, (state, { playlist }) => ({
    ...state,
    playlist,
    playlists: state.playlists.map(p => p.playlist_id === playlist.playlist_id ? playlist : p),
    loading: false,
    error: null
  })),
  on(PlaylistActions.addTrackToPlaylistFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  })),
  //Remove Track from Playlist
  on(PlaylistActions.removeTrackFromPlaylist, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(PlaylistActions.removeTrackFromPlaylistSuccess, (state, { playlist }) => ({
    ...state,
    playlist,
    playlists: state.playlists.map(p => p.playlist_id === playlist.playlist_id ? playlist : p),
    loading: false,
    error: null
  })),
  on(PlaylistActions.removeTrackFromPlaylistFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  })),
  //Get Shared Playlists with Me
  on(PlaylistActions.getPlaylistsSharedWithMe, (state) => ({
    ...state,
    loading: true,
    sharedPlalistsWithMe: [],
    error: null
  })),
  on(PlaylistActions.getPlaylistsSharedWithMeSuccess, (state, { sharedPlaylists }) => ({
    ...state,
    sharedPlalistsWithMe: sharedPlaylists,
    loading: false,
    error: null
  })),
  on(PlaylistActions.getPlaylistsSharedWithMeFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  }))
 
);