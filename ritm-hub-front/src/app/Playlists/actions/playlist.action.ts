import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { PlaylistDto } from '../Models/playlist.dto';
import { UserDto } from '../../Users/models/user.dto';

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

//Get User Playlists
export const getUserPlaylists = createAction(
    '[User Playlist] Get User Playlists',
    props<{ user: UserDto }>(),
);

export const getUserPlaylistsSuccess = createAction(
    '[User Playlist] Get User Playlists Success',
    props<{ playlists: PlaylistDto[] }>(),
);

export const getUserPlaylistsFailure = createAction(
    '[User Playlist] Get User Playlists Failure',
    props<{ payload: HttpErrorResponse }>(),
);