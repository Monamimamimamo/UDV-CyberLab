import { axiosClient, fileConfig } from '@/shared/api';
import { createFileUrl } from '@/shared/common/utils/file';
import type { CreateNewsDto } from '../dtos/create-news.dto';
import type { UpdateNewsDto } from '../dtos/update-news.dto';
import type { NewsCardDto } from '../dtos/news-card.dto';
import type { NewsDetailsDto } from '../dtos/news-details.dto';
import type { GetAllNewsParams } from '../models/query-params';

class ProjectApiService {
  public async getAll(params: GetAllNewsParams): Promise<NewsCardDto[]> {
    return await axiosClient.get('/api/NewsCard/allShort', {
      params: {
        sortOrder: params.sortOrder,
        searchQuery: params.search,
      },
    });
  }

  public async getDetailsById(id: string): Promise<NewsDetailsDto> {
    return await axiosClient.get(`/api/NewsCard/${id}`);
  }

  public async create(body: CreateNewsDto): Promise<string> {
    const fm = new FormData();

    fm.append('Name', body.name);
    fm.append('Description', body.description);
    fm.append('ShortDescription', body.shortDescription);
    fm.append('OwnerName', body.ownerName);
    fm.append('URL', body.url);
    fm.append('LogoPhoto', body.logoPhoto);

    return await axiosClient.post('/api/NewsCard', fm, fileConfig);
  }

  public async update(body: UpdateNewsDto): Promise<string> {
    const fm = new FormData();

    fm.append('Id', body.id);

    if (body.name) fm.append('Name', body.name);
    if (body.description) fm.append('Description', body.description);
    if (body.shortDescription) fm.append('ShortDescription', body.shortDescription);
    if (body.ownerName) fm.append('OwnerName', body.ownerName);
    if (body.url) fm.append('URL', body.url);
    if (body.logoPhoto) fm.append('LogoPhoto', body.logoPhoto);

    return await axiosClient.put('/api/NewsCard', fm, fileConfig);
  }

  public async getFile(path: string): Promise<string> {
    const base64: { item1: string; item2: string } = await axiosClient.get(
      '/api/ProjectFiles/file',
      {
        params: {
          path,
        },
      },
    );

    return createFileUrl(base64.item1, base64.item2);
  }
}

export const newsApiService = new ProjectApiService();
