import { axiosClient } from '@/shared/api';
import type { UserInfo } from '@/shared/types';

type GetUsersParams = { search?: string };

class AdminApi {
  public async deleteComment(commentId: string): Promise<boolean> {
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
}

export const adminApi = new AdminApi();
