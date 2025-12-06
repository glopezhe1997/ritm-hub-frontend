import { ActionReducerMap } from '@ngrx/store';
import { ArtistEffects } from './Artists/effects';
import * as ArtistReducer from './Artists/reducers/artist.reducer';

export interface AppState {
    artistState: ArtistReducer.ArtistState;
}

export const appReducers: ActionReducerMap<AppState> = {
    artistState: ArtistReducer.artistsReducer,
};