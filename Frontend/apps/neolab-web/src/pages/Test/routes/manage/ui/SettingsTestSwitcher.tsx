import { useEditTestNavigation } from '@/features/test-edit-nav';
import { ContentSwitcher } from '@/features/content-switcher';
import { useNavigate, useParams } from 'react-router-dom';

export const SettingsTestSwitcher = () => {
  const navType = useEditTestNavigation(state => state.navType);
  const { testId } = useParams();
  const navigate = useNavigate();

  return (
    <ContentSwitcher
      nextLabel="Далее"
      handlePrev={() => navigate(`/tests/manage/${testId}/edit/${navType}`)}
      handleNext={() => navigate(`/tests/manage/${testId}/preview`)}
    />
  );
};
