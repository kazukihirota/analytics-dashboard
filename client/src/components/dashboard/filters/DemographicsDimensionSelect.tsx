import { Filter } from 'lucide-react';
import { type FC, type ReactElement } from 'react';
import { FilterSelect } from '@/components/ui/filter-select';
import { useDashboard } from '@/contexts/DashboardContext';
import { DEMOGRAPHIC_DIMENSIONS } from '../../../../../shared/types/dashboard';
import { getMappedDemographicDimension } from '@/lib/filterMappings';

export const DemographicsDimensionSelect: FC = (): ReactElement => {
  const { demographicDimension, setDemographicDimension } = useDashboard();

  const demographicDimensionOptions = Object.values(DEMOGRAPHIC_DIMENSIONS).map(
    (dimension) => ({
      value: dimension,
      label: getMappedDemographicDimension(dimension),
    })
  );

  return (
    <FilterSelect
      value={demographicDimension}
      onValueChange={setDemographicDimension}
      options={demographicDimensionOptions}
      placeholder='Dimension'
      icon={Filter}
    />
  );
};
