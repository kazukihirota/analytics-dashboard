import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { FC, ReactElement } from 'react';

export type ChartErrorCardProps = {
  title: string;
  description: string;
  error: string;
};

export const ChartErrorCard: FC<ChartErrorCardProps> = ({
  title,
  description,
  error,
}): ReactElement => {
  return (
    <Card className='border-0 shadow-sm'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex items-center justify-center h-[300px]'>
          <div className='text-red-500'>Error loading data: {error}</div>
        </div>
      </CardContent>
    </Card>
  );
};
