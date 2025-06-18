import { type FC, type ReactElement } from 'react';
import { BookOpen } from 'lucide-react';
import { FilterSelect } from '@/components/ui/filter-select';
import { useDashboard } from '@/contexts/DashboardContext';
import { STUDY_TYPES } from '../../../../../shared/types/dashboard';
import { getMappedStudyType } from '@/lib/filterMappings';

export const StudyTypeSelect: FC = (): ReactElement => {
  const { studyType, setStudyType } = useDashboard();

  const studyTypeOptions = Object.values(STUDY_TYPES).map((studyType) => ({
    value: studyType,
    label: getMappedStudyType(studyType),
  }));

  return (
    <FilterSelect
      value={studyType}
      onValueChange={setStudyType}
      options={studyTypeOptions}
      icon={BookOpen}
    />
  );
};
