import { createAction, props } from "@ngrx/store";
import { AlbumDto } from "../Models/album.dto";
import { HttpErrorResponse } from "@angular/common/http";

export const getTrendingAlbums = createAction(
  '[Trending Albums] Get Trending Albums'
);

export const getTrendingAlbumsSuccess = createAction(
  '[Trending Albums] Get Trending Albums Success',
  props<{ albums: AlbumDto[] }>()
);

export const getTrendingAlbumsFailure = createAction(
  '[Trending Albums] Get Trending Albums Failure',
  props<{ playload: HttpErrorResponse }>()
);