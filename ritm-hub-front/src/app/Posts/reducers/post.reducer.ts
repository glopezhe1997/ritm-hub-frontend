import { createReducer, on } from '@ngrx/store';
import * as PostActions from '../actions/post.action';
import { PostDto } from '../Models/post.dto';

export interface PostState {
  myPosts: PostDto[]; // Mis posts
  followersPosts: PostDto[]; // Posts de los usuarios que sigo
  post: PostDto | null;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: PostState = {
  myPosts: [],
  followersPosts: [],
  post: null,
  loading: false,
  loaded: false,
  error: null
};

export const postsReducer = createReducer(
  initialState,
  // My Posts
  on(PostActions.getMyPosts, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(PostActions.getMyPostsSuccess, (state, { posts }) => ({
    ...state,
    myPosts: posts,
    loading: false,
    loaded: true,
    error: null
  })),
  on(PostActions.getMyPostsFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload
  })),
  // Create Post
    on(PostActions.postCreateUserPost, (state) => ({
      ...state,
      loading: true,
      error: null
    })),
    on(PostActions.postCreateUserPostSuccess, (state, { post }) => ({
      ...state,
      myPosts: [post, ...state.myPosts],
      loading: false,
      loaded: true,
      error: null
    })),
    on(PostActions.postCreateUserPostFailure, (state, { payload }) => ({
      ...state,
      loading: false,
      loaded: false,
      error: payload
    })),

  // Followers' Posts
);