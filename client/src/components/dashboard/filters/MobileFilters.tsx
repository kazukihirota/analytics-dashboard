import { type FC, type ReactElement } from 'react';
import { TimeRangeSelect } from './TimeRangeSelect';
import { RegionSelect } from './RegionSelect';
import { StudyTypeSelect } from './StudyTypeSelect';

export const MobileFilters: FC = (): ReactElement => {
  return (
    <div className='lg:hidden mb-4 p-3 bg-white rounded-lg border border-gray-200 shadow-sm'>
      <div className='space-y-2'>
        <div className='space-y-2 flex flex-col sm:flex-row justify-between gap-1'>
          <div>
            <label className='block text-xs font-medium text-gray-700 mb-1'>
              Time Range
            </label>
            <TimeRangeSelect />
          </div>
          <div>
            <label className='block text-xs font-medium text-gray-700 mb-1'>
              Region
            </label>
            <RegionSelect />
          </div>
          <div>
            <label className='block text-xs font-medium text-gray-700 mb-1'>
              Study Type
            </label>
            <StudyTypeSelect />
          </div>
        </div>
      </div>
    </div>
  );
};
