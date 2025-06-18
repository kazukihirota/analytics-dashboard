import { Card, CardContent } from '@/components/ui/card';
import type { FC, ReactElement } from 'react';
import { AlertTriangle } from 'lucide-react';
import { DASHBOARD_HEIGHTS } from '@/constants/dashboard';

interface KPICardErrorProps {
  message?: string;
}

export const KPICardError: FC<KPICardErrorProps> = ({
  message,
}): ReactElement => (
  <Card
    className={`bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-700 border shadow-sm ${DASHBOARD_HEIGHTS.KPI_CARD}`}
    data-testid='kpi-card-error'
  >
    <CardContent className='flex flex-col items-center justify-center h-full p-2 sm:p-3'>
      <AlertTriangle className='w-8 h-8 text-red-400 dark:text-red-300 mb-2' />
      <div className='text-xs text-red-500 dark:text-red-200 text-center'>
        {message || 'Error'}
      </div>
    </CardContent>
  </Card>
);
