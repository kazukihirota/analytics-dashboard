import { type FC, type ReactElement } from 'react';
import { DashboardHeader } from '@/components/dashboard/header/DashboardHeader';
import { DashboardContent } from '@/components/dashboard/DashboardContent';
import { DashboardProvider } from '@/contexts/DashboardContext';

export const Dashboard: FC = (): ReactElement => {
  return (
    <DashboardProvider>
      <section className='min-h-screen bg-gray-50 p-6'>
        <DashboardHeader />
        <DashboardContent />
      </section>
    </DashboardProvider>
  );
};
