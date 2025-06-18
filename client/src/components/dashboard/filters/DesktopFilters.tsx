import { type FC, type ReactElement } from 'react';
import { TimeRangeSelect } from './TimeRangeSelect';
import { RegionSelect } from './RegionSelect';
import { StudyTypeSelect } from './StudyTypeSelect';

export const DesktopFilters: FC = (): ReactElement => {
  return (
    <div className='hidden lg:flex lg:flex-row justify-between w-auto gap-2'>
      <TimeRangeSelect />
      <RegionSelect />
      <StudyTypeSelect />
    </div>
  );
};
