import { Action, createReducer, on } from "@ngrx/store";
import { followUser, followUserFailure, followUserSuccess, unfollowUser, unfollowUserFailure, unfollowUserSuccess } from "../actions";
import { UserDto } from "../../Users/models/user.dto";

export interface FollowState {
    usersFollowing: UserDto[];
    loading: boolean;
    error: string | null;
}

export const initialFollowState: FollowState = {
    usersFollowing: [],
    loading: false,
    error: null
};

export const _followReducer = createReducer(
    initialFollowState,
    // Follow User
    on(followUser, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(followUserSuccess, (state, { user }) => ({
        ...state,
        usersFollowing: [...state.usersFollowing, user],
        loading: false
    })),
    on(followUserFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        error: payload.message
    })),
    // Unfollow User
    on(unfollowUser, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(unfollowUserSuccess, (state, { userId }) => ({
        ...state,
        usersFollowing: state.usersFollowing.filter(user => user.id !== userId),
        loading: false
    })),
    on(unfollowUserFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        error: payload.message
    }))
);

export function followReducer(
    state: FollowState | undefined, 
    action: Action
) {
    return _followReducer(state, action);
}
 