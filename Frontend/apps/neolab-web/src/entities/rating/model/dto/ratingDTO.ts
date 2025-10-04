export interface RatingDTO {
  projectId: string;
  averageRating: number;
  userRating?: number;
  totalRatings: number;
}
