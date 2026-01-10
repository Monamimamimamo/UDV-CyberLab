import { axiosClient, fileConfig } from '@/shared/api';
import type { CreateProjectDTO } from '../../model/dto/CreateProjectDTO';
import type { ProjectCardDTO } from '../../model/dto/ProjectCardDTO';
import type { ProjectDTO } from '../../model/dto/ProjectDTO';
import type { UpdateProjectDTO } from '../../model/dto/UpdateProjectDTO';
import { createFileUrl } from '@/shared/common/utils/file';

type ProjectFiles = { logo: string; documentation: string };

type GetAllParams = { sortOrder?: number; search?: string };

class ProjectApi {
  public async getAll(params: GetAllParams): Promise<ProjectCardDTO[]> {
    return await axiosClient.get('/api/ProjectCard/allShort', {
      params: {
        sortOrder: params.sortOrder,
        searchQuery: params.search,
      },
    });
  }

  public async getAllMy(): Promise<ProjectCardDTO[]> {
    return await axiosClient.get('/api/ProjectCard/myCards');
  }

  public async getDetailsById(id: string): Promise<ProjectDTO> {
    return await axiosClient.get(`/api/ProjectCard/${id}`);
  }

  public async create(body: CreateProjectDTO): Promise<void> {
    const fm = new FormData();

    fm.append('Name', body.name);
    fm.append('Description', body.description);
    fm.append('ShortDescription', body.shortDescription);
    fm.append('Documentation', body.documentation);
    fm.append('LandingURL', body.landingURL);
    fm.append('OwnerName', body.ownerName);
    fm.append('LogoPhoto', body.logoPhoto);

    return await axiosClient.post('/api/ProjectCard', fm, fileConfig);
  }

  public async update(body: UpdateProjectDTO): Promise<string> {
    const fm = new FormData();

    fm.append('Id', body.id);

    if (body.name) fm.append('Name', body.name);
    if (body.description) fm.append('Description', body.description);
    if (body.shortDescription) fm.append('ShortDescription', body.shortDescription);
    if (body.documentation) fm.append('Documentation', body.documentation);
    if (body.landingURL) fm.append('LandingURL', body.landingURL);
    if (body.ownerName) fm.append('OwnerName', body.ownerName);
    if (body.logoPhoto) fm.append('LogoPhoto', body.logoPhoto);

    return await axiosClient.put('/api/ProjectCard', fm, fileConfig);
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

  public async getProjectFiles(id: string): Promise<ProjectFiles> {
    const base64: ProjectFiles & {
      logoMimeType: string;
      documentationMimeType: string;
    } = await axiosClient.get(`/api/ProjectFiles/${id}/files`);

    return {
      logo: createFileUrl(base64.logo, base64.logoMimeType),
      documentation: createFileUrl(base64.documentation, base64.documentationMimeType),
    };
  }
}

export const projectApi = new ProjectApi();
