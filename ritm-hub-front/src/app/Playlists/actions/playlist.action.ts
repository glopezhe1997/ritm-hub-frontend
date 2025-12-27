import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { PlaylistDto } from '../Models/playlist.dto';
import { UserDto } from '../../Users/models/user.dto';
import { PlaylistSpotifyDto } from '../Models/playlist-spotify.dto';
import { CreatePlaylistDto } from '../Components/playlist-form/playlist-form.component';
import { SharedPlaylistsResultDto } from '../Models/shared-playlists-result.dto';
import { UpdatePlaylistDto } from '../Models/update-playlist.dto';

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
    props<{ playlistId: number }>(),
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
    props<{ playlist: CreatePlaylistDto }>(),
);

export const postCreateUserPlaylistSuccess = createAction(
    '[Create Playlist] Post Create User Playlist Success',
    props<{ playlist: PlaylistDto }>(),
);

export const postCreateUserPlaylistFailure = createAction(
    '[Create Playlist] Post Create User Playlist Failure',
    props<{ payload: HttpErrorResponse }>(),
);

//Update Playlist
export const updateUserPlaylist = createAction(
    '[Update Playlist] Update User Playlist',
    props<{ playlistId: number, updateData: UpdatePlaylistDto }>(),
);

export const updateUserPlaylistSuccess = createAction(
    '[Update Playlist] Update User Playlist Success',
    props<{ playlist: PlaylistDto }>(),
);

export const updateUserPlaylistFailure = createAction(
    '[Update Playlist] Update User Playlist Failure',
    props<{ payload: HttpErrorResponse }>(),
);

//Delete Playlist
export const deleteUserPlaylist = createAction(
    '[Delete Playlist] Delete User Playlist',
    props<{ playlistId: number }>(),
);

export const deleteUserPlaylistSuccess = createAction(
    '[Delete Playlist] Delete User Playlist Success',
    props<{ playlistId: number, message: string  }>(),
);

export const deleteUserPlaylistFailure = createAction(
    '[Delete Playlist] Delete User Playlist Failure',
    props<{ payload: HttpErrorResponse }>(),
);

//Add track to playlist
export const addTrackToPlaylist = createAction(
  '[Playlist] Add Track To Playlist',
  props<{ playlistId: number, trackExternalId: string | undefined | null }>(),
);

export const addTrackToPlaylistSuccess = createAction(
  '[Playlist] Add Track To Playlist Success',
  props<{ playlist: PlaylistDto }>(),
);

export const addTrackToPlaylistFailure = createAction(
  '[Playlist] Add Track To Playlist Failure',
  props<{ payload: HttpErrorResponse }>(),
);

//Remove track from playlist
export const removeTrackFromPlaylist = createAction(
  '[Playlist] Remove Track From Playlist',
  props<{ playlistId: number, trackId: number }>(),
);

export const removeTrackFromPlaylistSuccess = createAction(
  '[Playlist] Remove Track From Playlist Success',
  props<{ playlist: PlaylistDto }>(),
);

export const removeTrackFromPlaylistFailure = createAction(
  '[Playlist] Remove Track From Playlist Failure',
  props<{ payload: HttpErrorResponse }>(),
);

// Get Shared Playlists with Me
export const getPlaylistsSharedWithMe = createAction(
  '[Shared Playlists] Get Playlists Shared With Me',
);

export const getPlaylistsSharedWithMeSuccess = createAction(
  '[Shared Playlists] Get Playlists Shared With Me Success',
  props<{ sharedPlaylists: PlaylistDto[] }>(),
);

export const getPlaylistsSharedWithMeFailure = createAction(
  '[Shared Playlists] Get Playlists Shared With Me Failure',
  props<{ payload: HttpErrorResponse }>(),
);

// Get Shared Playlist by Id
export const getSharedPlaylistById = createAction(
  '[Shared Playlist By Id] Get Shared Playlist By Id',
  props<{ playlistId: number }>(),
);

export const getSharedPlaylistByIdSuccess = createAction(
  '[Shared Playlist By Id] Get Shared Playlist By Id Success',
  props<{ playlist: PlaylistDto }>(),
);

export const getSharedPlaylistByIdFailure = createAction(
  '[Shared Playlist By Id] Get Shared Playlist By Id Failure',
  props<{ payload: HttpErrorResponse }>(),
);