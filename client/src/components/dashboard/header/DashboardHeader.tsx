import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DesktopFilters } from '../filters/DesktopFilters';
import { MobileFilters } from '../filters/MobileFilters';

export const DashboardHeader = () => {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  return (
    <>
      <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-0 mb-6'>
        <div className='flex items-center justify-between w-full lg:w-auto'>
          <div>
            <h1 className='text-xl lg:text-3xl font-bold text-gray-900'>
              Dashboard
            </h1>
            <p className='text-gray-600 mt-1 text-sm lg:text-base hidden lg:block'>
              Monitor and analyze participation data
            </p>
          </div>

          {/* Mobile filter toggle button */}
          <div className='lg:hidden'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
              className='h-8 px-3 flex items-center gap-1'
            >
              <Filter
                className={`w-3 h-3 ${isFilterPanelOpen && 'text-red-500'}`}
              />
              <span
                className={`text-xs ${isFilterPanelOpen && 'text-red-500'}`}
              >
                {isFilterPanelOpen ? 'Close' : 'Filters'}
              </span>
              {isFilterPanelOpen && <X className='w-3 h-3 text-red-500' />}
            </Button>
          </div>
        </div>

        <DesktopFilters />
      </div>

      {isFilterPanelOpen && <MobileFilters />}
    </>
  );
};
