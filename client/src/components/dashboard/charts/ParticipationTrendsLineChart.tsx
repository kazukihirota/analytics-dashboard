import { CartesianGrid, XAxis, LineChart, Line } from 'recharts';
import type { FC, ReactElement } from 'react';
import { useDashboardTrends } from '@/hooks/useDashboardData';
import { useMemo } from 'react';
import { ChartsLoadingCard } from './ChartLoading';
import { ChartErrorCard } from './ChartError';
import { DASHBOARD_CARDS } from '@/constants/dashboard';
import { BaseChartCard } from './BaseChartCard';
import { getChartColor } from '@/constants/colors';
import { useDashboard } from '@/contexts/DashboardContext';
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

export const ParticipationTrendsChart: FC = (): ReactElement => {
  const { timeRange, region, studyType } = useDashboard();
  const { data, isLoading, isError, error } = useDashboardTrends({
    timeRange,
    region,
    studyType,
  });

  const isMobile = isMobileWidth();

  const chartData = useMemo(() => {
    if (!data?.metrics || data.metrics.length === 0) {
      return [];
    }

    // Get all unique dates from all metrics
    const allDates = new Set<string>();
    data.metrics.forEach((metric) => {
      metric.data.forEach((item) => {
        allDates.add(item.date);
      });
    });

    const sortedDates = Array.from(allDates).sort();
    const transformedData = sortedDates.map((date) => {
      const dataPoint: any = { date };

      data.metrics.forEach((metric) => {
        const dateData = metric.data.find((item) => item.date === date);
        if (dateData) {
          const key = metric.name
            .toLowerCase()
            .replace(/\s+(\w)/g, (_, letter) => letter.toUpperCase());
          dataPoint[key] = dateData.value;
        }
      });

      return dataPoint;
    });

    return transformedData;
  }, [data]);

  const chartConfig: ChartConfig = useMemo(() => {
    if (!data?.metrics) return {};

    return data.metrics.reduce((config, metric, index) => {
      const key = metric.name.toLowerCase();
      const formattedName = formatMetricName(metric.name);

      config[key] = {
        label: formattedName,
        theme: {
          light: getChartColor(index),
          dark: getChartColor(index),
        },
      };

      return config;
    }, {} as ChartConfig);
  }, [data]);

  const { title } = DASHBOARD_CARDS.PARTICIPATION_TRENDS;
  const description = formatFilterDescription({ timeRange, region, studyType });

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
    <BaseChartCard title={title} description={description}>
      {chartData.length === 0 ? (
        <div className='flex items-center justify-center h-full'>
          <div className='text-gray-500'>No data available</div>
        </div>
      ) : (
        <ChartContainer config={chartConfig} className='min-h-[250px] w-full'>
          <LineChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            {!isMobile && (
              <XAxis
                dataKey='date'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                interval='preserveStartEnd'
              />
            )}
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            {data?.metrics?.map((metric, index) => {
              const key = metric.name
                .toLowerCase()
                .replace(/\s+(\w)/g, (_, letter) => letter.toUpperCase());
              const formattedName = formatMetricName(metric.name);

              return (
                <Line
                  key={metric.name}
                  type='monotone'
                  dataKey={key}
                  stroke={getChartColor(index)}
                  strokeWidth={2}
                  name={formattedName}
                  dot={false}
                  strokeOpacity={0.8}
                />
              );
            })}
          </LineChart>
        </ChartContainer>
      )}
    </BaseChartCard>
  );
};
