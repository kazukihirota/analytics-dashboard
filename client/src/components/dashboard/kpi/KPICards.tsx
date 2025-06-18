import type { FC, ReactElement } from 'react';
import { useDashboardSummary } from '@/hooks/useDashboardData';
import { KPICard } from './KPICard';
import { KPICardLoading } from './KPICardLoading';
import { KPICardError } from './KPICardError';
import { Users, FileText, Percent } from 'lucide-react';
import type { SummaryMetrics } from '../../../../../shared/types/dashboard';
import { TREND_DIRECTIONS } from '../../../../../shared/types/dashboard';
import { useDashboard } from '@/contexts/DashboardContext';

const cardConfigs = [
  {
    icon: Users,
    title: 'Total Participants',
    valueKey: 'totalParticipants',
    subtitle: '+12% from last period',
    trendDirection: TREND_DIRECTIONS.UP,
  },
  {
    icon: Users,
    title: 'Active Participants',
    valueKey: 'activeParticipants',
    subtitle: '+8% from last period',
    trendDirection: TREND_DIRECTIONS.UP,
  },
  {
    icon: FileText,
    title: 'Total Studies',
    valueKey: 'totalStudies',
    subtitle: 'No trend',
    trendDirection: TREND_DIRECTIONS.NEUTRAL,
  },
  {
    icon: FileText,
    title: 'Active Studies',
    valueKey: 'activeStudies',
    subtitle: '+4% from last period',
    trendDirection: TREND_DIRECTIONS.UP,
  },
  {
    icon: Percent,
    title: 'Completion Rate',
    valueKey: 'completionRate',
    subtitle: '+5% improvement',
    isPercent: true,
    trendDirection: TREND_DIRECTIONS.UP,
  },
  {
    icon: Users,
    title: 'Avg. Participants/Study',
    valueKey: 'averageEligibilityRate',
    subtitle: '-1% from last period',
    trendDirection: TREND_DIRECTIONS.DOWN,
  },
];

export const KPICards: FC = (): ReactElement => {
  const { timeRange, region, studyType } = useDashboard();
  const { data, isLoading, isError, error } = useDashboardSummary({
    timeRange,
    region,
    studyType,
  });
  const errorMessage = error?.message || 'Error loading data';

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-3'>
      {cardConfigs.map((config, idx) => {
        if (isLoading) {
          return <KPICardLoading key={idx} />;
        }
        if (isError || !data) {
          return <KPICardError key={idx} message={errorMessage} />;
        }
        const value = config.isPercent
          ? `${data[config.valueKey as keyof SummaryMetrics]}%`
          : data[config.valueKey as keyof SummaryMetrics]?.toString();
        return (
          <KPICard
            key={idx}
            icon={config.icon}
            title={config.title}
            value={value}
            subtitle={config.subtitle}
            trendDirection={config.trendDirection}
          />
        );
      })}
    </div>
  );
};
