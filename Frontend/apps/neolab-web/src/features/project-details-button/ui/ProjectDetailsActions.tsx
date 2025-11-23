import { type ProjectDTO, useSuspenseProjectFiles } from '@/entities/project';
import { SiGoogledocs } from 'react-icons/si';
import { CgWebsite } from 'react-icons/cg';
import { ActionButton } from '@/shared/ui';
import { IoStarSharp } from 'react-icons/io5';
import { useProjectRatingModal } from '@/features/project-rating-modal';

export const ProjectDetailsActions = ({
  project,
}: {
  project: Pick<ProjectDTO, 'landingURL' | 'name' | 'id'>;
}) => {
  const open = useProjectRatingModal(state => state.open);
  const {
    data: { documentation },
  } = useSuspenseProjectFiles(project.id);

  const handleDocsOpen = (fileName = 'document') => {
    const [header, base64Data] = documentation.split(';base64,');
    const mimeType = header.split(':')[1];

    const bytes = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
    const blob = new Blob([bytes], { type: mimeType });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  const handleProjectOpen = () => {
    window.open(project.landingURL, '_blank');
  };

  const handleOpenRatingModal = () => {
    open({ projectId: project.id });
  };

  return (
    <div className="flex flex-row gap-1">
      <ActionButton
        className="text-2xl bg-yellow-500/30 text-yellow-500 border-yellow/30"
        onPress={handleOpenRatingModal}
        label="Оценить проект"
        icon={IoStarSharp}
      />
      <ActionButton
        className="text-xl border-foreground/20"
        onPress={handleProjectOpen}
        label="Демонстрационный проект"
        icon={CgWebsite}
      />
      <ActionButton
        className="text-xl border-foreground/20"
        onPress={() => handleDocsOpen(project.name)}
        label="Скачать документацию"
        icon={SiGoogledocs}
      />
    </div>
  );
};
