export interface TrackDto {
  id: string;
  name: string;
  album: {
    name: string;
    images?: Array<{ url: string; height: number; width: number }>;
  };
  artists: Array<{ name: string }>;
  duration_ms: number;
  popularity?: number;
  preview_url?: string | null;
}
