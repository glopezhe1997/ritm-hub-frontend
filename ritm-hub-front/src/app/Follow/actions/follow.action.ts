import { createAction, props } from "@ngrx/store";
import { UserDto } from "../../Users/models/user.dto";
import { HttpErrorResponse } from "@angular/common/http";
import { FollowControllerDto } from "../Models/follow-controller.dto";
// Follow User Actions
export const followUser = createAction(
  "[Follow] Follow User",
    props<{ followData: FollowControllerDto }>()
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
  "[Follow] Unfollow User",
  props<{ followData: FollowControllerDto }>()
);
export const unfollowUserSuccess = createAction(
  "[Follow] Unfollow User Success",
  props<{ userId: number }>()
);

export const unfollowUserFailure = createAction(
  "[Follow] Unfollow User Failure",
  props<{ payload: HttpErrorResponse }>()
);

// Get Following Users Actions
export const getFollowingUsers = createAction(
  "[Follow] Get Following Users",
  props<{ userId: number }>()
);

export const getFollowingUsersSuccess = createAction(
  "[Follow] Get Following Users Success",
  props<{ users: UserDto[] }>()
);

export const getFollowingUsersFailure = createAction(
  "[Follow] Get Following Users Failure",
  props<{ payload: HttpErrorResponse }>()
);

// Clear Follow State Action
export const clearFollowState = createAction(
  "[Follow] Clear Follow State"
);