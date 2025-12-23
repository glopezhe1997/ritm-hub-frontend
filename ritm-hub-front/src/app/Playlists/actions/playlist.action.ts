import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { PlaylistDto } from '../Models/playlist.dto';
import { UserDto } from '../../Users/models/user.dto';
import { PlaylistSpotifyDto } from '../Models/playlist-spotify.dto';

export const getTrendingPlaylists = createAction(
    '[Trending Playlist] Get Trending Playlists',
);

export const getTrendingPlaylistsSuccess = createAction(
    '[Trending Playlist] Get Trending Playlists Success',
    props<{ playlists: PlaylistSpotifyDto[] }>(),
);

export const getTrendingPlaylistsFailure = createAction(
    '[Trending Playlist] Get Trending Playlists Failure',
    props<{ payload: HttpErrorResponse }>(),
);

//Get Post by Id
export const getPlaylistById = createAction(
    '[Playlist By Id] Get Playlist By Id',
    props<{ playlistId: string }>(),
);

export const getPlaylistByIdSuccess = createAction(
    '[Playlist By Id] Get Playlist By Id Success',
    props<{ playlist: PlaylistDto }>(),
);

export const getPlaylistByIdFailure = createAction(
    '[Playlist By Id] Get Playlist By Id Failure',
    props<{ payload: HttpErrorResponse }>(),
);

//Get User Playlists
export const getUserPlaylists = createAction(
    '[User Playlist] Get User Playlists',
);

export const getUserPlaylistsSuccess = createAction(
    '[User Playlist] Get User Playlists Success',
    props<{ playlists: PlaylistDto[] }>(),
);

export const getUserPlaylistsFailure = createAction(
    '[User Playlist] Get User Playlists Failure',
    props<{ payload: HttpErrorResponse }>(),
);

//Create Playlist
export const postCreateUserPlaylist = createAction(
    '[Create Playlist] Post Create User Playlist',
    props<{ playlist: PlaylistDto }>(),
);

export const postCreateUserPlaylistSuccess = createAction(
    '[Create Playlist] Post Create User Playlist Success',
    props<{ playlist: PlaylistDto }>(),
);

export const postCreateUserPlaylistFailure = createAction(
    '[Create Playlist] Post Create User Playlist Failure',
    props<{ payload: HttpErrorResponse }>(),
);