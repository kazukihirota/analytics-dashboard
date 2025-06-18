import { Calendar } from 'lucide-react';
import { type FC, type ReactElement } from 'react';
import { FilterSelect } from '@/components/ui/filter-select';
import { useDashboard } from '@/contexts/DashboardContext';
import { TIME_RANGES } from '../../../../../shared/types/dashboard';
import { getMappedTimeRange } from '@/lib/filterMappings';

export const TimeRangeSelect: FC = (): ReactElement => {
  const { timeRange, setTimeRange } = useDashboard();

  const timeRangeOptions = Object.values(TIME_RANGES).map((timeRange) => ({
    value: timeRange,
    label: getMappedTimeRange(timeRange),
  }));

  return (
    <FilterSelect
      value={timeRange}
      onValueChange={setTimeRange}
      options={timeRangeOptions}
      icon={Calendar}
    />
  );
};
