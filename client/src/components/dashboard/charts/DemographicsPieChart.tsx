import { useMemo, type FC, type ReactElement } from 'react';
import { BaseChartCard } from './BaseChartCard';
import { Pie, PieChart } from 'recharts';
import { DASHBOARD_CARDS } from '@/constants/dashboard';
import { useDashboard } from '@/contexts/DashboardContext';
import { useDashboardDemographics } from '@/hooks/useDashboardData';
import { ChartErrorCard } from './ChartError';
import { ChartsLoadingCard } from './ChartLoading';
import { getChartColor } from '@/constants/colors';
import { DemographicsDimensionSelect } from '../filters/DemographicsDimensionSelect';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import { formatFilterDescription } from '@/lib/filterMappings';

export const DemographicsPieChart: FC = (): ReactElement => {
  const { timeRange, region, studyType, demographicDimension } = useDashboard();
  const { data, isLoading, isError, error } = useDashboardDemographics({
    timeRange,
    region,
    studyType,
    dimension: demographicDimension,
  });
  const { title } = DASHBOARD_CARDS.DEMOGRAPHICS_PIE_CHART;
  const description = formatFilterDescription({ timeRange, region, studyType });

  const chartData = useMemo(() => {
    if (!data?.metrics || data.metrics.length === 0) {
      return [];
    }
    // Sort by percentage descending
    return data.metrics
      .map((metric, index) => ({
        name: metric.name,
        value: metric.percentage,
        fill: getChartColor(index),
      }))
      .sort((a, b) => b.value - a.value);
  }, [data]);

  const chartConfig: ChartConfig = useMemo(() => {
    if (!data?.metrics) return {};

    return data.metrics.reduce((config, metric, index) => {
      config[metric.name] = {
        label: metric.name,
        theme: {
          light: getChartColor(index),
          dark: getChartColor(index),
        },
      };

      return config;
    }, {} as ChartConfig);
  }, [data]);

  if (isLoading) {
    return <ChartsLoadingCard title={title} description={description} />;
  }

  if (isError) {
    return (
      <ChartErrorCard
        title={title}
        description={description}
        error={error?.message}
      />
    );
  }

  return (
    <BaseChartCard
      title={title}
      description={description}
      headerAction={<DemographicsDimensionSelect />}
    >
      {chartData.length === 0 ? (
        <div className='flex items-center justify-center h-full'>
          <div className='text-gray-500'>No data available</div>
        </div>
      ) : (
        <ChartContainer config={chartConfig} className='min-h-[250px] w-full'>
          <PieChart>
            <Pie
              data={chartData}
              dataKey='value'
              nameKey='name'
              fillOpacity={0.8}
            />
            <ChartLegend
              content={
                <ChartLegendContent
                  nameKey='name'
                  className={'flex-wrap justify-center gap-2 xl:gap-4'}
                />
              }
            />
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ChartContainer>
      )}
    </BaseChartCard>
  );
};
