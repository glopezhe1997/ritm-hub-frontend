import { createReducer, on } from '@ngrx/store';
import * as AlbumActions from '../actions/album.action';
import { AlbumDto } from '../Models/album.dto';
import { ArtistDto } from '../../Artists/Models/artist.dto';

export interface AlbumState {
  albums: AlbumDto[];
  album: AlbumDto | null;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: AlbumState = {
  albums: [],
  album: null,
  loading: false,
  loaded: false,
  error: null
};

export const albumsReducer = createReducer(
    initialState,
    on(AlbumActions.getTrendingAlbums, (state) => ({
        ...state,
        loading: true,
    })),
    on(AlbumActions.getTrendingAlbumsSuccess, (state, { albums}) => ({
        ...state,
        albums,
        loading: false,
        loaded: true,
        error: null
    })),
    on(AlbumActions.getTrendingAlbumsFailure, (state, { playload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: playload
    }))
);