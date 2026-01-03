export interface UpdatePlaylistDto {
    name: string;
    description?: string;
    is_public?: boolean;
    images?: string[];
}
