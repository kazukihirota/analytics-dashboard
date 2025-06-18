import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { DASHBOARD_HEIGHTS } from '@/constants/dashboard';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { TrendDirection } from '../../../../../shared/types/dashboard';

export type KPICardProps = {
  icon: React.ElementType;
  title: string;
  value: string;
  subtitle: string;
  trendDirection?: TrendDirection;
};

export const KPICard = ({
  icon: Icon,
  title,
  value,
  subtitle,
  trendDirection = 'up',
}: KPICardProps) => {
  const getTrendIcon = () => {
    switch (trendDirection) {
      case 'up':
        return <TrendingUp className='w-3 h-3 text-green-600' />;
      case 'down':
        return <TrendingDown className='w-3 h-3 text-red-600' />;
      default:
        return <Minus className='w-3 h-3 text-gray-400' />;
    }
  };

  return (
    <Card
      className={`border-0 shadow-sm gap-1 sm:gap-2 text-center flex items-center justify-center py-1 sm:py-2 ${DASHBOARD_HEIGHTS.KPI_CARD}`}
    >
      <CardHeader className='flex flex-col items-center justify-center w-full pb-1'>
        <CardDescription className='flex items-center gap-1 text-xs xl:text-sm'>
          <Icon className='hidden sm:block w-4 h-4' />
          {title}
        </CardDescription>
      </CardHeader>
      <CardContent className='pt-0'>
        <div className='flex items-center justify-center gap-1'>
          <div className='text-base xl:text-2xl font-bold'>{value}</div>
          {getTrendIcon()}
        </div>
        <p
          className={`text-xs xl:text-sm mt-0.5 ${
            trendDirection === 'up'
              ? 'text-green-600'
              : trendDirection === 'down'
              ? 'text-red-600'
              : 'text-gray-600'
          } hidden xl:block`}
        >
          {subtitle}
        </p>
      </CardContent>
    </Card>
  );
};
