import { ActionReducerMap } from '@ngrx/store';
import { ArtistEffects } from './Artists/effects';
import * as ArtistReducer from './Artists/reducers/artist.reducer';
import * as albumsReducer from './Albums/reducers/album.reducer';
import * as TrackReducer from './Tracks/reducers/track.reducer';
import * as PlaylistReducer from './Playlists/reducers/playlist.reducer';
import * as AuthReducer from './Auth/reducers/auth.reducer';
import * as UserReducer from './Users/reducers/users.reducer';
import * as AdminReducer from './Admin/reducers/admin.reducer';
import * as PostRedcucer from './Posts/reducers/post.reducer';
import * as FollowReducer from './Follow/reducers/follow.reducer';

export interface AppState {
    artistState: ArtistReducer.ArtistState;
    albumState: albumsReducer.AlbumState;
    trackState: TrackReducer.TrackState;
    playlistState: PlaylistReducer.PlaylistState;
    authState: AuthReducer.AuthState;
    userState: UserReducer.UsersState;
    adminState: AdminReducer.AdminState
    postState: PostRedcucer.PostState;
    followState: FollowReducer.FollowState;
}

export const appReducers: ActionReducerMap<AppState> = {
    artistState: ArtistReducer.artistsReducer,
    albumState: albumsReducer.albumsReducer,
    trackState: TrackReducer.tracksReducer,
    playlistState: PlaylistReducer.playlistsReducer,
    authState: AuthReducer.authReducer,
    userState: UserReducer.usersReducer,
    adminState: AdminReducer.adminReducer,
    postState: PostRedcucer.postsReducer,
    followState: FollowReducer.followReducer,
};