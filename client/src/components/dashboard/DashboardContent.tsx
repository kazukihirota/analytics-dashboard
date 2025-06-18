import { KPICards } from './kpi/KPICards';
import { ParticipationTrendsChart } from './charts/ParticipationTrendsLineChart';
import { type FC } from 'react';
import { MetricsBarChart } from './charts/ComparisonBarChart';
import { DemographicsPieChart } from './charts/DemographicsPieChart';

export const DashboardContent: FC = () => {
  return (
    <section className='space-y-6'>
      <div className='flex flex-col gap-4'>
        <KPICards />
        <div className='flex flex-col gap-4'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <DemographicsPieChart />
            <ParticipationTrendsChart />
          </div>
          <MetricsBarChart />
        </div>
      </div>
    </section>
  );
};
