import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import type { FC, ReactElement, ReactNode } from 'react';

interface BaseChartCardProps {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
  headerAction?: ReactNode;
}

export const BaseChartCard: FC<BaseChartCardProps> = ({
  title,
  description,
  children,
  className = '',
  headerAction,
}): ReactElement => {
  return (
    <Card
      className={`border-0 shadow-sm ${className} py-4 sm:py-6 gap-2 sm:gap-6`}
    >
      <CardHeader className='px-4 sm:px-6'>
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
          <div className='flex flex-col gap-1'>
            <div className='flex items-center justify-between sm:justify-start gap-3'>
              <CardTitle>{title}</CardTitle>
              {headerAction && (
                <div className='flex items-center sm:hidden'>
                  {headerAction}
                </div>
              )}
            </div>
            <CardDescription className='hidden sm:block'>
              {description}
            </CardDescription>
          </div>
          {headerAction && (
            <div className='hidden sm:flex items-end justify-end w-full sm:w-auto'>
              {headerAction}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <div>{children}</div>
      </CardContent>
    </Card>
  );
};
