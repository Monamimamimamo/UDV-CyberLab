export interface NewsCardDto {
  id: string;
  name: string;
  shortDescription: string;
  logoPath: string;
  rating: number;
  viewsCount: number;
  commentsCount?: number;
}
