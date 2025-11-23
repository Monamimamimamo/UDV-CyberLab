import { MdComment } from 'react-icons/md';
import { FaEye } from 'react-icons/fa';

type ProjectStatsProps = {
  commentsCount: number;
  viewsCount: number;
};

export const ProjectStats = ({
  commentsCount,
  viewsCount,
}: ProjectStatsProps) => {
  return (
    <div className="text-[11px] flex gap-1">
      <div className="flex gap-1 items-center">
        <MdComment />
        <p>{commentsCount}</p>
      </div>
      <div className="flex gap-1 items-center">
        <FaEye />
        <p>{viewsCount}</p>
      </div>
    </div>
  );
};
