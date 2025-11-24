export interface NewsDetailsDto {
  description: string;
  url: string;
  id: string;
  name: string;
  shortDescription: string;
  rating: number;
  logoPath: string;
  viewsCount: number;
  commentsCount?: number;
}
