import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import type { FC, ReactElement } from 'react';

export type ChartsLoadingCardProps = {
  title: string;
  description: string;
};

export const ChartsLoadingCard: FC<ChartsLoadingCardProps> = ({
  title,
  description,
}): ReactElement => {
  return (
    <Card className='border-0 shadow-sm'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex items-center justify-center h-[300px]'>
          <div className='flex items-center gap-2 text-gray-500'>
            <Loader2 className='h-5 w-5 animate-spin' />
            <span>Loading...</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
