import { axiosClient } from '@/shared/api';
import type { SetRatingDTO } from '../../model/dto/setRatingDTO';
import type { RatingDTO } from '../../model/dto/ratingDTO';

class NewsRatingApi {
  public async getUserRating(newsId: string): Promise<RatingDTO> {
    return await axiosClient.get(`/api/NewsRating/card/${newsId}`);
  }

  public async setRating(body: SetRatingDTO): Promise<{ projectId: string }> {
    return await axiosClient.post('/api/NewsRating', body);
  }
}

export const newsRatingApi = new NewsRatingApi();

