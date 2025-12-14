import { useParams } from 'react-router-dom';

const LearnMaterialsPreviewPage = () => {
  const { materialId = '' } = useParams();

  return <div>{materialId}</div>;
};

export default LearnMaterialsPreviewPage;
