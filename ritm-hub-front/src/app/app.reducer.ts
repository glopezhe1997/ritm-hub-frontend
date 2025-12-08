import { ActionReducerMap } from '@ngrx/store';
import { ArtistEffects } from './Artists/effects';
import * as ArtistReducer from './Artists/reducers/artist.reducer';
import * as albumsReducer from './Albums/reducers/album.reducer';
import * as TrackReducer from './Tracks/reducers/track.reducer';
import * as PlaylistReducer from './Playlists/reducers/playlist.reducer';

export interface AppState {
    artistState: ArtistReducer.ArtistState;
    albumState: albumsReducer.AlbumState;
    trackState: TrackReducer.TrackState;
    playlistState: PlaylistReducer.PlaylistState;
}

export const appReducers: ActionReducerMap<AppState> = {
    artistState: ArtistReducer.artistsReducer,
    albumState: albumsReducer.albumsReducer,
    trackState: TrackReducer.tracksReducer,
    playlistState: PlaylistReducer.playlistsReducer,
};