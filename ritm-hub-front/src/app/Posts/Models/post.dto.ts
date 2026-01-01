import { UserDto } from "../../Users/models/user.dto";
import { PostTrackDto } from "./post-track.dto";
import { PostStatus } from "../Models/post-status.enum";

export interface PostDto {
  post_id: number;
  title: string;
  content: string;
  status: PostStatus;
  owner: UserDto;
  createdAt: Date; 
  track?: PostTrackDto | null;
}
