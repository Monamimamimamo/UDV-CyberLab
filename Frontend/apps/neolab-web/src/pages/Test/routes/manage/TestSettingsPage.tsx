import { TestSettings } from '@/widgets/test-settings-edit';
import { SettingsTestSwitcher } from './ui/SettingsTestSwitcher';
import { useTestEditing } from '@/entities/test-editing';
import { useParams } from 'react-router-dom';

const TestSettingsPage = () => {
  const { testId = '' } = useParams();
  const { data } = useTestEditing(testId);

  return (
    <section className="flex flex-col gap-[12px]">
      <TestSettings data={data} />
      <SettingsTestSwitcher />
    </section>
  );
};

export default TestSettingsPage;
