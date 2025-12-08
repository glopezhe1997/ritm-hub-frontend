import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { TracksService } from '../services/tracks.service';
import * as TrackActions from '../actions/track.action';

@Injectable()
export class TrackEffects {

  getTrendingTracks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.getTrendingTracks),
      switchMap(() =>
        this.tracksService.getTrendingTracks().pipe(
          map(tracks => TrackActions.getTrendingTracksSuccess({ tracks })),
          catchError(error => of(TrackActions.getTrendingTracksFailure({ payload: error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private tracksService: TracksService
  ) {}
}
