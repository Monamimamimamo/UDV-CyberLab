import { ContentSwitcher } from '@/features/content-switcher';
import { memo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const EditTestSwitcher = memo(() => {
  const { testId } = useParams();
  const navigate = useNavigate();

  return (
    <ContentSwitcher
      hasPrev={false}
      nextLabel="Далее"
      handleNext={() => navigate(`/tests/manage/${testId}/settings`)}
    />
  );
});
