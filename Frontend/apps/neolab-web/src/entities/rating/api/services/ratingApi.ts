import { axiosClient } from '@/shared/api';
import type { SetRatingDTO } from '../../model/dto/setRatingDTO';
import type { RatingDTO } from '../../model/dto/ratingDTO';

class RatingApi {
  public async getUserRating(projectId: string): Promise<RatingDTO> {
    return await axiosClient.get(`/api/Rating/project/${projectId}`);
  }

  public async setRating(body: SetRatingDTO): Promise<{ projectId: string }> {
    return await axiosClient.post('/api/Rating', body);
  }
}

export const ratingApi = new RatingApi();
