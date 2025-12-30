import { TrackDto } from "../../Tracks/Models/track.dto";
import { UserDto } from "../../Users/models/user.dto";

export enum PostStatus {
  HAPPY = 'happy',
  SAD = 'sad',
  ANGRY = 'angry',
  EXCITED = 'excited',
}

export interface PostTrackDto {
  id: number;
  title: string;
  album: {
    name: string;
    images?: Array<{ url: string; height: number; width: number }>;
  };
  artists: Array<{ name: string }>;
  duration_ms: number;
  popularity?: number;
  preview_url?: string | null;
  external_id?: string | null;
}

export interface PostDto {
  post_id: number;
  title: string;
  content: string;
  status: PostStatus;
  owner: UserDto;
  createdAt: Date; 
  track?: PostTrackDto | null;
}
