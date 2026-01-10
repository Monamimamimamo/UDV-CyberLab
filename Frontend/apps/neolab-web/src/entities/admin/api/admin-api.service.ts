import { axiosClient } from '@/shared/api';
import type { UserInfo } from '@/shared/types';
import type { GetUsersParams } from './get-users-params';

class AdminApiService {
  public async getUsers(params: GetUsersParams): Promise<UserInfo[]> {
    return await axiosClient.get('/api/Admin/users', {
      params: {
        searchName: params.search,
      },
    });
  }

  public async deleteUser(userId: string): Promise<boolean> {
    return await axiosClient.delete(`/api/Admin/user/${userId}`);
  }

  public async changeUserRole(body: { userId: string; role: string }): Promise<boolean> {
    return await axiosClient.post('/api/Admin/changeRole', body);
  }

  public async deleteProjectComment(commentId: string): Promise<boolean> {
    return await axiosClient.delete(`/api/Admin/comment/${commentId}`);
  }

  public async deleteProject(projectId: string): Promise<boolean> {
    return await axiosClient.delete(`/api/Admin/project/${projectId}`);
  }

  public async deleteNews(newsId: string) {
    return await axiosClient.delete(`/api/NewsCard?id=${newsId}`);
  }

  public async deleteLearnMaterials(materialId: string) {
    return await axiosClient.delete(`/api/LearnMaterialsCard?id=${materialId}`);
  }
}

export const adminApiService = new AdminApiService();
