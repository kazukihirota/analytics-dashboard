import { Card, CardContent } from '@/components/ui/card';
import type { FC, ReactElement } from 'react';
import { DASHBOARD_HEIGHTS } from '@/constants/dashboard';

export const KPICardLoading: FC = (): ReactElement => (
  <Card
    className={`animate-pulse border-0 shadow-sm ${DASHBOARD_HEIGHTS.KPI_CARD}`}
    data-testid='kpi-card-loading'
  >
    <CardContent className='flex flex-col items-center justify-center h-full p-2 sm:p-3'>
      <div className='w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full mb-2' />
      <div className='h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-1' />
      <div className='h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2' />
    </CardContent>
  </Card>
);
