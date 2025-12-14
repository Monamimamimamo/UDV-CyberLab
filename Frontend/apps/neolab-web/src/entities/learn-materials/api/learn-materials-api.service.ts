import { axiosClient, fileConfig } from '@/shared/api';
import { createFileUrl } from '@/shared/common/utils/file';
import type { CreateLearnMaterialDto } from '../dtos/create-learn-material.dto';
import type { LearnMaterialCardDto } from '../dtos/learn-material-card.dto';
import type { LearnMaterialDetailsDto } from '../dtos/learn-material-details.dto';
import type { UpdateLearnMaterialDto } from '../dtos/update-learn-material.dto';
import type { GetAllLearnMaterialsParams } from '../models/query-params';

class LearnMaterialsApiService {
  public async getAll(params: GetAllLearnMaterialsParams): Promise<LearnMaterialCardDto[]> {
    return await axiosClient.get('/api/LearnMaterialCard/allShort', {
      params: {
        sortOrder: params.sortOrder,
        searchQuery: params.search,
      },
    });
  }

  public async getDetailsById(id: string): Promise<LearnMaterialDetailsDto> {
    return await axiosClient.get(`/api/LearnMaterialCard/${id}`);
  }

  public async create(body: CreateLearnMaterialDto): Promise<string> {
    const fm = new FormData();

    fm.append('Name', body.name);
    fm.append('Description', body.description);
    fm.append('ShortDescription', body.shortDescription);
    fm.append('PublicationType', body.publicationType);
    fm.append('OwnerName', body.ownerName);
    fm.append('URL', body.url);
    fm.append('LogoPhoto', body.logoPhoto);

    return await axiosClient.post('/api/LearnMaterialCard', fm, fileConfig);
  }

  public async update(body: UpdateLearnMaterialDto): Promise<string> {
    const fm = new FormData();

    fm.append('Id', body.id);

    if (body.name) fm.append('Name', body.name);
    if (body.description) fm.append('Description', body.description);
    if (body.shortDescription) fm.append('ShortDescription', body.shortDescription);
    if (body.publicationType) fm.append('PublicationType', body.publicationType);
    if (body.ownerName) fm.append('OwnerName', body.ownerName);
    if (body.url) fm.append('URL', body.url);
    if (body.logoPhoto) fm.append('LogoPhoto', body.logoPhoto);

    return await axiosClient.put('/api/LearnMaterialCard', fm, fileConfig);
  }

  public async delete(id: string): Promise<void> {
    await axiosClient.delete(`/api/LearnMaterialCard/${id}`);
  }

  public async getFile(path: string): Promise<string> {
    const base64: { item1: string; item2: string } = await axiosClient.get('/api/Files/file', {
      params: {
        path,
      },
    });

    return createFileUrl(base64.item1, base64.item2);
  }
}

export const learnMaterialsApiService = new LearnMaterialsApiService();
