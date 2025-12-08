import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { AlbumsService } from '../services/albums.service';
import * as AlbumActions from '../actions/album.action';

@Injectable()
export class AlbumsEffects {

  getTrendingAlbums$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlbumActions.getTrendingAlbums),
      switchMap(() =>
        this.albumsService.getTrendingAlbums().pipe(
          map(albums => AlbumActions.getTrendingAlbumsSuccess({ albums })),
          catchError(error => of(AlbumActions.getTrendingAlbumsFailure({ playload: error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private albumsService: AlbumsService
  ) {}
}
