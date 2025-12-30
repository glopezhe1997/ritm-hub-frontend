import { TrackDto } from "../../Tracks/Models/track.dto";
import { UserDto } from "../../Users/models/user.dto";

export enum PostStatus {
  HAPPY = 'happy',
  SAD = 'sad',
  ANGRY = 'angry',
  EXCITED = 'excited',
}

export interface PostDto {
  post_id: number;
  title: string;
  content: string;
  status: PostStatus;
  owner: UserDto;
  createdAt: Date; 
  track?: TrackDto | null;
}
