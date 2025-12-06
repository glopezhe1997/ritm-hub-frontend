import { createReducer, on } from '@ngrx/store';
import * as ArtistActions from '../actions/artist.action';
import { ArtistDto } from '../Models/artist.dto';

export interface ArtistState {
  artists: ArtistDto[];
  artist: ArtistDto | null;
  loading: boolean;
  error: any;
}

export const initialState: ArtistState = {
  artists: [],
  artist: null,
  loading: false,
  error: null
};

export const artistsReducer = createReducer(
  initialState,
  on(ArtistActions.getTrendingArtists, (state) => ({
    ...state,
    loading: true
  })),
  on(ArtistActions.getTrendingArtistsSuccess, (state, { artists }) => ({
    ...state,
    artists,
    loading: false,
    error: null
  })),
  on(ArtistActions.getTrendingArtistsFailure, (state, { playload }) => ({
    ...state,
    loading: false,
    error: playload
  }))
);