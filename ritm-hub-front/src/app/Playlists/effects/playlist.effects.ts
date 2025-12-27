import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { PlaylistsService } from '../services/playlists.service';
import * as PlaylistActions from '../actions/playlist.action';
import { Router } from '@angular/router';

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

  postCreateUserPlaylistRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PlaylistActions.postCreateUserPlaylistSuccess),
        tap(() => {
          this.router.navigate(['/playlists']);
        })
      ),
    { dispatch: false }
  );
  
  //Update Playlist
  updateUserPlaylist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlaylistActions.updateUserPlaylist),
      switchMap(action =>
        this.playlistsService.updateUserPlaylist(action.playlistId, action.updateData).pipe(
          map(playlist => PlaylistActions.updateUserPlaylistSuccess({ playlist })),
          catchError(error => of(PlaylistActions.updateUserPlaylistFailure({ payload: error })))
        )
      )
    )
  );

  //Redirect after update
  updateUserPlaylistRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PlaylistActions.updateUserPlaylistSuccess),
        tap(() => {
          this.router.navigate(['/playlists']);
        })
      ),
    { dispatch: false }
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

  //Add Track to Playlist
  addTrackToPlaylist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlaylistActions.addTrackToPlaylist),
      switchMap(action =>
        this.playlistsService.addTracksToPlaylist(action.playlistId, action.trackExternalId).pipe(
          map(playlist => PlaylistActions.addTrackToPlaylistSuccess({ playlist })),
          catchError(error => of(PlaylistActions.addTrackToPlaylistFailure({ payload: error })))
        )
      )
    )
  );

  //Remove Track from Playlist
  removeTrackFromPlaylist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlaylistActions.removeTrackFromPlaylist),
      switchMap(action =>
        this.playlistsService.removeTrackFromPlaylist(action.playlistId, action.trackId).pipe(
          map(playlist => PlaylistActions.removeTrackFromPlaylistSuccess({ playlist })),
          catchError(error => of(PlaylistActions.removeTrackFromPlaylistFailure({ payload: error })))
        )
      )
    )
  );

  //Get Playlists Shared With Me
  getPlaylistsSharedWIthMe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlaylistActions.getPlaylistsSharedWithMe),
      switchMap(() =>
        this.playlistsService.getPlaylistsSharedWithMe().pipe(
          map(sharedPlaylists => PlaylistActions.getPlaylistsSharedWithMeSuccess({ sharedPlaylists })),
          catchError(error => of(PlaylistActions.getPlaylistsSharedWithMeFailure({ payload: error })))
        )
      )
    )
  );    

  constructor(
    private actions$: Actions,
    private playlistsService: PlaylistsService,
    private router: Router,
  ) {}
}
