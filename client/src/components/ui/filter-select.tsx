import { type LucideIcon } from 'lucide-react';
import { type ReactElement } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';

export interface FilterSelectOption<T> {
  value: T;
  label: string;
}

export interface FilterSelectProps<T> {
  value: T;
  onValueChange: (value: T) => void;
  options: FilterSelectOption<T>[];
  placeholder?: string;
  icon?: LucideIcon;
  iconClassName?: string;
  triggerClassName?: string;
  itemClassName?: string;
  containerClassName?: string;
  showIcon?: boolean;
  responsive?: boolean;
}

export const FilterSelect = <T extends string>({
  value,
  onValueChange,
  options,
  placeholder = 'Select option',
  icon: Icon,
}: FilterSelectProps<T>): ReactElement => {
  const triggerClassName = 'w-full sm:w-44 md:w-52';
  const fontSizeClass = 'text-xs sm:text-sm xl:text-base';

  return (
    <div>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className={`${triggerClassName}`}>
          {Icon && <Icon className='w-4 h-4 mr-1 hidden lg:block' />}
          <SelectValue placeholder={placeholder} className={fontSizeClass} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className={fontSizeClass}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
