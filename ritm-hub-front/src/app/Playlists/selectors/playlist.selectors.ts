// selectors/playlist.selectors.ts
import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.reducer';

export const selectPlaylistState = (state: AppState) => state.playlistState;

export const selectPlaylistById = (playlistId: number) =>
  createSelector(
    selectPlaylistState,
    (state) => state.playlists.find(p => p.playlist_id === playlistId)
  );

export const selectSharedPlaylistWithMe = createSelector(
  selectPlaylistState,
  (state) => state.sharedPlaylistWithMe
);

export const selectPlaylist = createSelector(
  selectPlaylistState,
  (state) => state.playlist
);