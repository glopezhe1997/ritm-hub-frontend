export interface PlaylistSpotifyDto {
  id: string;
  name: string;
  description: string;
  images: {
    url: string;
    height: number | null;
    width: number | null;
  }[];
  owner: {
    display_name: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  tracks: {
    href: string;
    total: number;
  };
  public: boolean;
  collaborative: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  snapshot_id: string;
  type: string;
  uri: string;
  primary_color: string | null;
}