import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { ArtistDto } from '../Models/artist.dto';

export const getTrendingArtists = createAction(
    '[ Trending Artist] Get Trending Artists',
);

export const getTrendingArtistsSuccess = createAction(
    '[ Trending Artist] Get Trending Artists Success',
    props<{ artists: ArtistDto[] }>(),
);

export const getTrendingArtistsFailure = createAction(
    '[ Trending Artist] Get Trending Artists Failure',
    props<{ playload: HttpErrorResponse }>(),
);