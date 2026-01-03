import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { TrackDto } from '../Models/track.dto';

export const getTrendingTracks = createAction(
    '[Trending Track] Get Trending Tracks',
);

export const getTrendingTracksSuccess = createAction(
    '[Trending Track] Get Trending Tracks Success',
    props<{ tracks: TrackDto[] }>(),
);

export const getTrendingTracksFailure = createAction(
    '[Trending Track] Get Trending Tracks Failure',
    props<{ payload: HttpErrorResponse }>(),
);

//Search Tracks
export const searchTracks = createAction(
    '[Search Track] Search Tracks',
    props<{ query: string }>(),
);

export const searchTracksSuccess = createAction(
    '[Search Track] Search Tracks Success',
    props<{ tracks: TrackDto[] }>(),
);

export const searchTracksFailure = createAction(
    '[Search Track] Search Tracks Failure',
    props<{ payload: HttpErrorResponse }>(),
);