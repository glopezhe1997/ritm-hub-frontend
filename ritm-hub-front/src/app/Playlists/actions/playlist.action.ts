import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { PlaylistDto } from '../Models/playlist.dto';

export const getTrendingPlaylists = createAction(
    '[Trending Playlist] Get Trending Playlists',
);

export const getTrendingPlaylistsSuccess = createAction(
    '[Trending Playlist] Get Trending Playlists Success',
    props<{ playlists: PlaylistDto[] }>(),
);

export const getTrendingPlaylistsFailure = createAction(
    '[Trending Playlist] Get Trending Playlists Failure',
    props<{ payload: HttpErrorResponse }>(),
);
