import { Filter } from 'lucide-react';
import { type FC, type ReactElement } from 'react';
import { FilterSelect } from '@/components/ui/filter-select';
import { useDashboard } from '@/contexts/DashboardContext';
import { COMPARISON_DIMENSIONS } from '../../../../../shared/types/dashboard';
import { getMappedComparisonDimension } from '@/lib/filterMappings';

export const ComparisonDimensionSelect: FC = (): ReactElement => {
  const { comparisonDimension, setComparisonDimension } = useDashboard();

  const comparisonDimensionOptions = Object.values(COMPARISON_DIMENSIONS).map(
    (dimension) => ({
      value: dimension,
      label: getMappedComparisonDimension(dimension),
    })
  );

  return (
    <FilterSelect
      value={comparisonDimension}
      onValueChange={setComparisonDimension}
      options={comparisonDimensionOptions}
      placeholder='Dimension'
      icon={Filter}
    />
  );
};
