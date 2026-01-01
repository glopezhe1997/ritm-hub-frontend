import { PostStatus } from "./post-status.enum";

export interface CreatePostDto {
    title: string;
    content: string;
    status: PostStatus;
    track_id?: string;
}
