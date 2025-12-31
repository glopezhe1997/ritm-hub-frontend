import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { PostsService } from '../services/posts.service';
import * as PostActions from '../actions/post.action';
import { Router } from '@angular/router';
import { ToastService } from '../../Shared/services/toast.service';

@Injectable()
export class PostEffects {

  getMyPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.getMyPosts),
      switchMap(action =>
        this.postsService.getMyPosts().pipe(
          map(posts => PostActions.getMyPostsSuccess({ posts })),
          catchError(error => of(PostActions.getMyPostsFailure({ payload: error })))
        )
      )
    )
  );

  // Get Followees posts
  getFolloweesPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.getFolloweesPosts),
      switchMap(action =>
        this.postsService.getMyFeed().pipe(
          map(posts => PostActions.getFolloweesPostsSuccess({ posts })),
          catchError(error => of(PostActions.getFolloweesPostsFailure({ payload: error })))
        )
      )
    )
  );

  postCreatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.postCreateUserPost),
      switchMap(action =>
        this.postsService.createPost(action.post).pipe(
          map(post => PostActions.postCreateUserPostSuccess({ post })),
          catchError(error => of(PostActions.postCreateUserPostFailure({ payload: error })))
        )
      )
    )
  );

    postCreatePostSuccessToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PostActions.postCreateUserPostSuccess),
        tap(() => {
          this.toast.show('¡Post creado con éxito!', 'success');
        })
      ),
    { dispatch: false }
  );

  postCreatePostFailureToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PostActions.postCreateUserPostFailure),
        tap(action => {
          const msg =
            action.payload?.error?.message ||
            action.payload?.message ||
            'Error al crear el post';
          this.toast.show(msg, 'error');
        })
      ),
    { dispatch: false }
  );

  postCreatePostRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PostActions.postCreateUserPostSuccess),
        tap(() => {
          this.router.navigate(['/posts']);
        })
      ),
    { dispatch: false } 
  )

  // Get My Post By Id
  getMyPostById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.getMyPostById),
      switchMap(action =>
        this.postsService.getMyPostById(action.postId).pipe(
          map(post => PostActions.getMyPostByIdSuccess({ post })),
          catchError(error => of(PostActions.getMyPostByIdFailure({ payload: error })))
        )
      )
    )
  );  
  
  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private router: Router,
    private toast: ToastService
  ) {}
}