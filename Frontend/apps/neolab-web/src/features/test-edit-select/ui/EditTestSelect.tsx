import { Select, SelectItem } from '@/shared/ui';
import { editTestSelect } from '../const/editTest';
import {
  EditTestNavigation,
  useEditTestNavigation,
  parseUrlToStatus,
  getEditStatusUrl,
} from '@/features/test-edit-nav';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigation } from '@/shared/hooks';

export const EditTestSelect = () => {
  const { scrollNavigate } = useNavigation();
  const { pathname } = useLocation();
  const { testId } = useParams();
  const { navType, setNavType } = useEditTestNavigation();

  const handleChange = (key: EditTestNavigation) => {
    if (navType === key) return;
    setNavType(key);
    scrollNavigate(getEditStatusUrl(testId as string, key));
  };

  useEffect(() => {
    if (pathname.includes(`/tests/manage/${testId}/edit`)) {
      setNavType(parseUrlToStatus(pathname));
    }
  }, [pathname, setNavType, testId]);

  return (
    <Select
      size="sm"
      radius="md"
      color="secondary"
      listboxProps={{
        itemClasses: {
          base: 'data-[hover=true]:bg-[#CDCDE3] data-[selectable=true]:focus:text-foreground data-[hover=true]:text-foreground data-[selectable=true]:focus:bg-[#CDCDE3] !outline-none',
          title: 'text-[13px]',
        },
      }}
      selectedKeys={[navType || 'custom']}
      onChange={e => handleChange(e.target.value as EditTestNavigation)}
      label="Задать содержание"
      className="sm:max-w-[300px] w-full"
    >
      {editTestSelect.map(({ key, label }) => (
        <SelectItem key={key}>{label}</SelectItem>
      ))}
    </Select>
  );
};
