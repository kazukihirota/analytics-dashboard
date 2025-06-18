import { type FC, type ReactElement } from 'react';
import { MapPin } from 'lucide-react';
import { FilterSelect } from '@/components/ui/filter-select';
import { useDashboard } from '@/contexts/DashboardContext';
import { REGIONS } from '../../../../../shared/types/dashboard';
import { getMappedRegion } from '@/lib/filterMappings';

export const RegionSelect: FC = (): ReactElement => {
  const { region, setRegion } = useDashboard();

  const regionOptions = Object.values(REGIONS).map((region) => ({
    value: region,
    label: getMappedRegion(region),
  }));

  return (
    <FilterSelect
      value={region}
      onValueChange={setRegion}
      options={regionOptions}
      icon={MapPin}
    />
  );
};
