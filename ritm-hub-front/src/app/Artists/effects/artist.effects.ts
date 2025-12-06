import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { ArtistsService } from '../services/artists.service';
import * as ArtistActions from '../actions/artist.action';

@Injectable()
export class ArtistEffects {

  getTrendingArtists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArtistActions.getTrendingArtists),
      switchMap(() =>
        this.artistsService.getTrendingArtists().pipe(
          map(artists => ArtistActions.getTrendingArtistsSuccess({ artists })),
          catchError(error => of(ArtistActions.getTrendingArtistsFailure({ playload: error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private artistsService: ArtistsService
  ) {}
}