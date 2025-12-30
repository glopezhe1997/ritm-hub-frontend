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