export interface PlaylistDto {
  playlist_id: number;  // <-- era 'id: string'
  name: string;
  description?: string | null;
  images?: string | null;  // <-- simplifica si solo es una URL
  owner_id?: number | null;  // <-- era 'owner: { display_name: string }'
  tracks: any[];
  is_public?: boolean;
  external_id?: string | null;
  createdAt?: string;
  owner?: {
    display_name: string;
  }
}
