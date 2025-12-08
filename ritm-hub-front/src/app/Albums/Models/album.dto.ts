import { ArtistDto } from "../../Artists/Models/artist.dto";

export class AlbumDto {
  id!: number;
  name: string;
  artists: ArtistDto[];
  external_Id?: string | null;
  img_url?: string | null;
  images?: Array<{ url: string; height: number; width: number }>;

  constructor(name: string, artist: ArtistDto[], external_Id?: string | null, images?: Array<{ url: string; height: number; width: number }>, img_url?: string | null) {
    this.name = name;
    this.artists = artist;
    this.external_Id = external_Id || null;
    this.images =  images;
    this.img_url = img_url || null;
  }
}
