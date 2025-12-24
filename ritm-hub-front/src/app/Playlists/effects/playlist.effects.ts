import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { PlaylistsService } from '../services/playlists.service';
import * as PlaylistActions from '../actions/playlist.action';

@Injectable()
export class PlaylistEffects {

  getTrendingPlaylists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlaylistActions.getTrendingPlaylists),
      switchMap(() =>
        this.playlistsService.getTrendingPlaylists().pipe(
          map(playlists => PlaylistActions.getTrendingPlaylistsSuccess({ playlists })),
          catchError(error => of(PlaylistActions.getTrendingPlaylistsFailure({ payload: error })))
        )
      )
    )
  );

  getUserPlaylists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlaylistActions.getUserPlaylists),
      switchMap(action =>
        this.playlistsService.getUserPlaylists().pipe(
          map(playlists => PlaylistActions.getUserPlaylistsSuccess({ playlists })),
          catchError(error => of(PlaylistActions.getUserPlaylistsFailure({ payload: error })))
        )
      )
    )
  );

  postCreateUserPlaylist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlaylistActions.postCreateUserPlaylist),
      switchMap(action =>
        this.playlistsService.postCreateUserPlaylist(action.playlist).pipe(
          map(playlist => PlaylistActions.postCreateUserPlaylistSuccess({ playlist })),
          catchError(error => of(PlaylistActions.postCreateUserPlaylistFailure({ payload: error })))
        )
      )
    )
  );

  getPlaylistById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlaylistActions.getPlaylistById),
      switchMap(action =>
        this.playlistsService.getPlaylistById(action.playlistId).pipe(
          map(playlist => PlaylistActions.getPlaylistByIdSuccess({ playlist })),
          catchError(error => of(PlaylistActions.getPlaylistByIdFailure({ payload: error })))
        )
      )
    )
  );

  deleteUserPlaylist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlaylistActions.deleteUserPlaylist),
      switchMap(action =>
        this.playlistsService.deleteUserPlaylist(action.playlistId).pipe(
          map(() => PlaylistActions.deleteUserPlaylistSuccess({ 
            playlistId: action.playlistId, 
            message: 'Playlist deleted successfully'
          })),
          catchError(error => of(PlaylistActions.deleteUserPlaylistFailure({ payload: error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private playlistsService: PlaylistsService
  ) {}
}
