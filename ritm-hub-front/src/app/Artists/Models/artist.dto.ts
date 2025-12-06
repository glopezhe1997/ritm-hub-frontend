export class ArtistDto {
  id!: string;
  name: string;
  external_id: string;
  genres: string[];
  followers: { href: string | null; total: number };
  images?: Array<{ url: string; height: number; width: number }>;
  img_url?: string | null;
  popularity?: number;

  constructor(
    name: string, 
    genres: string[],
    followers: { href: string | null; total: number },
    external_id?: string,
    images?: Array<{ url: string; height: number; width: number }>,
    img_url?: string | null
  ) {
    this.name = name;
    this.genres = genres;
    this.followers = followers;
    this.external_id = external_id || '';
    this.images = images;
    this.img_url = img_url || null;
  }
}