export interface CreatePlaylistsDto {
    name: string;
    description?: string;
    is_public?: boolean;
    images?: string[];
}
