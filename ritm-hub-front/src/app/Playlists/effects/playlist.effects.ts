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

  constructor(
    private actions$: Actions,
    private playlistsService: PlaylistsService
  ) {}
}
