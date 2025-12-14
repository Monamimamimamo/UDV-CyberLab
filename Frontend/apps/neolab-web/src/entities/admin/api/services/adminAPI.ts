import { axiosClient } from '@/shared/api';
import type { UserInfo } from '@/shared/types';

type GetUsersParams = { search?: string };

class AdminApi {
  public async deleteProjectComment(commentId: string): Promise<boolean> {
    return await axiosClient.delete(`/api/Admin/comment/${commentId}`);
  }

  public async deleteProject(projectId: string): Promise<boolean> {
    return await axiosClient.delete(`/api/Admin/project/${projectId}`);
  }

  public async deleteUser(userId: string): Promise<boolean> {
    return await axiosClient.delete(`/api/Admin/user/${userId}`);
  }

  public async getUsers(params: GetUsersParams): Promise<UserInfo[]> {
    return await axiosClient.get('/api/Admin/users', {
      params: {
        searchName: params.search,
      },
    });
  }

  public async deleteNews(newsId: string) {
    return await axiosClient.delete(`/api/NewsCard?id=${newsId}`);
  }

  public async deleteLearnMaterials(materialId: string) {
    return await axiosClient.delete(`/api/LearnMaterialsCard?id=${materialId}`);
  }
}

export const adminApi = new AdminApi();
