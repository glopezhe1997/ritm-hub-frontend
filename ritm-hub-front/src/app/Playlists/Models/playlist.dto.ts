export interface PlaylistDto {
  id: string;
  name: string;
  description?: string | null;
  images?: Array<{ url: string; height: number; width: number }>;
  owner: {
    display_name: string;
  };
  tracks: {
    total: number;
  };
  public?: boolean;
}
