import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { PostDto } from '../Models/post.dto';
import { CreatePostDto } from '../Models/create-post.dto';
// import { UpdatePostDto } from '../Models/update-post.dto';

// Create Post
export const postCreateUserPost = createAction(
    '[Create Post] Post Create User Post',
    props<{ post: CreatePostDto }>(),
);

export const postCreateUserPostSuccess = createAction(
    '[Create Post] Post Create User Post Success',
    props<{ post: PostDto }>(),
);

export const postCreateUserPostFailure = createAction(
    '[Create Post] Post Create User Post Failure',
    props<{ payload: HttpErrorResponse }>(),
);

// Get My Posts
export const getMyPosts = createAction(
    '[My Posts] Get My Posts',
);

export const getMyPostsSuccess = createAction(
    '[My Posts] Get My Posts Success',
    props<{ posts: PostDto[] }>(),
);

export const getMyPostsFailure = createAction(
    '[My Posts] Get My Posts Failure',
    props<{ payload: HttpErrorResponse }>(),
);

// Get My Post By Id
export const getMyPostById = createAction(
    '[Post By Id] Get Post By Id',
    props<{ postId: number }>(),
);

export const getMyPostByIdSuccess = createAction(
    '[Post By Id] Get Post By Id Success',
    props<{ post: PostDto }>(),
);

export const getMyPostByIdFailure = createAction(
    '[Post By Id] Get Post By Id Failure',
    props<{ payload: HttpErrorResponse }>(),
);

// Get following users posts
export const getFolloweesPosts = createAction(
    '[Followees Posts] Get Followees Posts',
);

export const getFolloweesPostsSuccess = createAction(
    '[Followees Posts] Get Followees Posts Success',
    props<{ posts: PostDto[] }>(),
);

export const getFolloweesPostsFailure = createAction(
    '[Followees Posts] Get Followees Posts Failure',
    props<{ payload: HttpErrorResponse }>(),
);

// Add one track to post
export const addTrackToPost = createAction(
    '[Post] Add Track To Post',
    props<{ postId: number; trackId: string }>(),
);

export const addTrackToPostSuccess = createAction(
    '[Post] Add Track To Post Success',
    props<{ post: PostDto }>(),
);

// Get my followees posts
export const getMyFolloweesPosts = createAction(
    '[My Followees Posts] Get My Followees Posts',
);

export const getMyFolloweesPostsSuccess = createAction(
    '[My Followees Posts] Get My Followees Posts Success',
    props<{ posts: PostDto[] }>(),
);

export const getMyFolloweesPostsFailure = createAction(
    '[My Followees Posts] Get My Followees Posts Failure',
    props<{ payload: HttpErrorResponse }>(),
);