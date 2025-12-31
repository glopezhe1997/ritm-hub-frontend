import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { PlaylistsService } from '../services/playlists.service';
import * as PlaylistActions from '../actions/playlist.action';
import { Router } from '@angular/router';
import { ToastService } from '../../Shared/services/toast.service';

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

  //Toast
  postCreateUserPlaylistSuccessToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PlaylistActions.postCreateUserPlaylistSuccess),
        tap(() => {
          this.toastService.show('¡Playlist created!', 'success');
        })
      ),
    { dispatch: false }
  );

  postCreateUserPlaylistFailureToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PlaylistActions.postCreateUserPlaylistFailure),
        tap((action) => {
          const msg =
            action.payload?.error?.message ||
            action.payload?.message ||
            'Error al creating the playlist';
          this.toastService.show(msg, 'error');
        })
      ),
    { dispatch: false }
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

  // Toast for update
  updateUserPlaylistSuccessToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PlaylistActions.updateUserPlaylistSuccess),
        tap(() => {
          this.toastService.show('¡Playlist updated!', 'success');
        })
      ),
    { dispatch: false }
  );

  updateUserPlaylistFailureToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PlaylistActions.updateUserPlaylistFailure),
        tap((action) => {
          const msg =
            action.payload?.error?.message ||
            action.payload?.message ||
            'Error updating the playlist';
          this.toastService.show(msg, 'error');
        })
      ),
    { dispatch: false }
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
          catchError(error => {
            // Si es 404, intenta como compartida
            if (error?.status === 404 || error?.status === 403) {
              return of(PlaylistActions.getSharedPlaylistById({ playlistId: action.playlistId }));
            }
            // Si es otro error, lanza el error normal
            return of(PlaylistActions.getPlaylistByIdFailure({ payload: error }));
          })
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

  // Toast en eliminar playlist
  deleteUserPlaylistSuccessToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PlaylistActions.deleteUserPlaylistSuccess),
        tap((action) => {
          this.toastService.show(action.message || 'Playlist deleted', 'success');
        })
      ),
    { dispatch: false }
  );

    deleteUserPlaylistFailureToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PlaylistActions.deleteUserPlaylistFailure),
        tap((action) => {
          const msg =
            action.payload?.error?.message ||
            action.payload?.message ||
            'Error deleting the playlist';
          this.toastService.show(msg, 'error');
        })
      ),
    { dispatch: false }
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

  //Tast
  addTrackToPlaylistSuccessToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PlaylistActions.addTrackToPlaylistSuccess),
        tap(() => {
          this.toastService.show('Track added!', 'success');
        })
      ),
    { dispatch: false }
  );

  addTrackToPlaylistFailureToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PlaylistActions.addTrackToPlaylistFailure),
        tap((action) => {
          const msg =
            action.payload?.error?.message ||
            action.payload?.message ||
            'Error adding track to playlist';
          this.toastService.show(msg, 'error');
        })
      ),
    { dispatch: false }
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

  // Toast removing track from playlist
  removeTrackFromPlaylistSuccessToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PlaylistActions.removeTrackFromPlaylistSuccess),
        tap(() => {
          this.toastService.show('Track removed!', 'info');
        })
      ),
    { dispatch: false }
  );

  removeTrackFromPlaylistFailureToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PlaylistActions.removeTrackFromPlaylistFailure),
        tap((action) => {
          const msg =
            action.payload?.error?.message ||
            action.payload?.message ||
            'Error removing track from playlist';
          this.toastService.show(msg, 'error');
        })
      ),
    { dispatch: false }
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

  //Get Shared Playlist By Id
  getSharedPlaylistById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlaylistActions.getSharedPlaylistById),
      switchMap(action =>
        this.playlistsService.getSharedPlaylistById(action.playlistId).pipe(
          map(playlist => PlaylistActions.getSharedPlaylistByIdSuccess({ playlist })),
          catchError(error => of(PlaylistActions.getSharedPlaylistByIdFailure({ payload: error })))
        )
      )
    )
  );
  
  constructor(
    private actions$: Actions,
    private playlistsService: PlaylistsService,
    private router: Router,
    private toastService: ToastService
  ) {}
}
