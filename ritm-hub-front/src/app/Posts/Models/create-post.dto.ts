import { TrackDto } from "../../Tracks/Models/track.dto";
import { PostStatus } from "./post.dto";

export interface CreatePostDto {
    title: string;
    content: string;
    status: PostStatus;
    track_id?: string;
}
