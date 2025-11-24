import { axiosClient } from '@/shared/api';
import type { SetRatingDTO } from '../../model/dto/setRatingDTO';
import type { RatingDTO } from '../../model/dto/ratingDTO';

class ProjectRatingApi {
  public async getUserRating(projectId: string): Promise<RatingDTO> {
    return await axiosClient.get(`/api/ProjectCardRating/card/${projectId}`);
  }

  public async setRating(body: SetRatingDTO): Promise<{ projectId: string }> {
    return await axiosClient.post('/api/ProjectCardRating', body);
  }
}

export const projectRatingApi = new ProjectRatingApi();
