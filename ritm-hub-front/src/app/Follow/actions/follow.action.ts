import { createAction, props } from "@ngrx/store";
import { UserDto } from "../../Users/models/user.dto";
import { HttpErrorResponse } from "@angular/common/http";
// Follow User Actions
export const followUser = createAction(
  "[Follow] Follow User"
);

export const followUserSuccess = createAction(
  "[Follow] Follow User Success",
  props<{ response: string, user: UserDto }>()
);

export const followUserFailure = createAction(
  "[Follow] Follow User Failure",
  props<{ payload: HttpErrorResponse }>()
);

// Unfollow User Actions
export const unfollowUser = createAction(
  "[Follow] Unfollow User"
);
export const unfollowUserSuccess = createAction(
  "[Follow] Unfollow User Success",
  props<{ userId: number }>()
);

export const unfollowUserFailure = createAction(
  "[Follow] Unfollow User Failure",
  props<{ payload: HttpErrorResponse }>()
);