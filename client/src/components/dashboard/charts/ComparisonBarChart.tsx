import type { FC, ReactElement } from 'react';
import { useDashboardComparisons } from '@/hooks/useDashboardData';
import { ChartErrorCard } from './ChartError';
import { ChartsLoadingCard } from './ChartLoading';
import { DASHBOARD_CARDS } from '@/constants/dashboard';
import { BaseChartCard } from './BaseChartCard';
import { Bar, BarChart, XAxis, CartesianGrid } from 'recharts';
import { useMemo } from 'react';
import { getChartColor } from '@/constants/colors';
import { useDashboard } from '@/contexts/DashboardContext';
import { ComparisonDimensionSelect } from '../filters/ComparisonDimensionSelect';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import {
  formatFilterDescription,
  formatMetricName,
} from '@/lib/filterMappings';
import { isMobileWidth } from '@/hooks/useWindowWidth';

export const MetricsBarChart: FC = (): ReactElement => {
  const { timeRange, comparisonDimension } = useDashboard();
  const { data, isLoading, isError, error } = useDashboardComparisons({
    timeRange,
    dimension: comparisonDimension,
  });
  const isMobile = isMobileWidth();

  const chartData = useMemo(() => {
    if (!data?.metrics || data.metrics.length === 0) {
      return [];
    }

    return data.metrics.map((metric) => ({
      name: formatMetricName(metric.name),
      applications: metric.applications,
      completions: metric.completions,
    }));
  }, [data]);

  const chartConfig: ChartConfig = useMemo(() => {
    return {
      applications: {
        label: 'Applications',
        theme: {
          light: getChartColor(0),
          dark: getChartColor(0),
        },
      },
      completions: {
        label: 'Completions',
        theme: {
          light: getChartColor(1),
          dark: getChartColor(1),
        },
      },
    };
  }, []);

  const { title } = DASHBOARD_CARDS.METRICS_BAR_CHART;
  const description = formatFilterDescription({ timeRange });

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
      headerAction={<ComparisonDimensionSelect />}
    >
      {chartData.length === 0 ? (
        <div className='flex items-center justify-center h-full'>
          <div className='text-gray-500'>No data available</div>
        </div>
      ) : (
        <ChartContainer
          config={chartConfig}
          className='min-h-[250px] max-h-[450px] w-full max-w-4/5 mx-auto'
        >
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />

            {!isMobile && (
              <XAxis
                dataKey='name'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                interval='preserveStartEnd'
              />
            )}
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey='applications'
              fill={getChartColor(0)}
              name='Applications'
              fillOpacity={0.8}
            />
            <Bar
              dataKey='completions'
              fill={getChartColor(1)}
              name='Completions'
              fillOpacity={0.8}
            />
          </BarChart>
        </ChartContainer>
      )}
    </BaseChartCard>
  );
};
