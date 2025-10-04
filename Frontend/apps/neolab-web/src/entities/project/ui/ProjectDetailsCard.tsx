import { Card, Image } from '@heroui/react';
import type { ProjectDTO } from '../model/dto/ProjectDTO';
import { ProjectStats } from './ProjectStats';
import { useSuspenseProjectFiles } from '../api/queries/useProjectFiles';
import { Rating } from '@/shared/ui';

export const ProjectDetailsCard = ({ project }: { project: ProjectDTO }) => {
  const {
    data: { logo, documentation },
  } = useSuspenseProjectFiles(project.id);

  const onFileDownload = (fileName = 'document') => {
    const [header, base64Data] = documentation.split(';base64,');
    const mimeType = header.split(':')[1];

    const bytes = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
    const blob = new Blob([bytes], { type: mimeType });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  return (
    <Card className="drop-shadow-base custom-outline w-full max-w-[712px] rounded-[12px] px-[30px] py-[30px]">
      <div className="flex h-full flex-col gap-7 sm:flex-row">
        <div className="sm:h-[160px] sm:w-[160px]">
          <Image
            shadow="sm"
            radius="md"
            isBlurred={true}
            src={logo}
            alt={project.name}
            className="h-full w-full overflow-hidden object-cover object-center sm:h-[160px] sm:w-[160px]"
            classNames={{
              wrapper: 'w-full h-full sm:h-[160px] sm:w-[160px]',
            }}
          />
        </div>

        <div className="flex w-full flex-col">
          <h2 className="mb-4 text-2xl font-medium break-words">{project.name}</h2>
          <p className="line-clamp-6 text-sm break-words">{project.shortDescription}</p>
          <div className="mt-4 flex flex-row items-center justify-between sm:mt-auto">
            <p className="text-xs">Автор: {project.ownerName}</p>
            <div className="flex flex-row items-center justify-between gap-7">
              <Rating rating={project.rating} />
              <ProjectStats commentsCount={project.commentsCount} viewsCount={project.viewsCount} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 text-sm break-words">{project.description}</div>

      <div>{/* Photos */}</div>

      <div className="mt-6">
        <ul className="flex list-disc flex-col gap-2 pl-6 text-sm text-blue-500">
          <li>
            <a
              onClick={() => onFileDownload(project.name)}
              className="cursor-pointer hover:underline"
            >
              Скачать документацию
            </a>
          </li>
          <li>
            <a href={project.landingURL} target="_blank" className="cursor-pointer hover:underline">
              Демонстрация проекта
            </a>
          </li>
        </ul>
      </div>
    </Card>
  );
};
