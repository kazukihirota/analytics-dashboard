import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FilterSelect, type FilterSelectProps } from './filter-select';
import { Calendar, Filter } from 'lucide-react';

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

describe('FilterSelect', () => {
  const defaultOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const defaultProps: FilterSelectProps<string> = {
    value: 'option1',
    onValueChange: vi.fn(),
    options: defaultOptions,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<FilterSelect {...defaultProps} />);

      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('renders with icon when provided', () => {
      render(<FilterSelect {...defaultProps} icon={Calendar} />);

      const trigger = screen.getByRole('combobox');
      const icons = trigger.querySelectorAll('svg');
      expect(icons).toHaveLength(2); // Calendar icon + chevron
      expect(icons[0]).toHaveClass('w-4', 'h-4', 'mr-1', 'hidden', 'lg:block');
    });

    it('does not render custom icon when not provided', () => {
      render(<FilterSelect {...defaultProps} />);

      const trigger = screen.getByRole('combobox');
      // Should only have the chevron icon, not the custom icon
      const icons = trigger.querySelectorAll('svg');
      expect(icons).toHaveLength(1); // Only the chevron icon
    });

    it('applies correct trigger classes', () => {
      render(<FilterSelect {...defaultProps} />);

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveClass('w-full', 'sm:w-44', 'md:w-52');
    });
  });

  describe('Value handling', () => {
    it('displays current value', () => {
      render(<FilterSelect {...defaultProps} value='option2' />);

      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('displays placeholder when value is empty', () => {
      render(
        <FilterSelect
          {...defaultProps}
          value=''
          placeholder='Choose an option'
        />
      );

      expect(screen.getByText('Choose an option')).toBeInTheDocument();
    });
  });

  describe('Options handling', () => {
    it('renders single option', () => {
      const singleOption = [{ value: 'single', label: 'Single Option' }];
      render(
        <FilterSelect {...defaultProps} options={singleOption} value='single' />
      );

      expect(screen.getByText('Single Option')).toBeInTheDocument();
    });

    it('renders many options', () => {
      const manyOptions = Array.from({ length: 10 }, (_, i) => ({
        value: `option${i}`,
        label: `Option ${i}`,
      }));
      render(
        <FilterSelect {...defaultProps} options={manyOptions} value='option5' />
      );

      expect(screen.getByText('Option 5')).toBeInTheDocument();
    });

    it('handles options with special characters', () => {
      const specialOptions = [
        { value: 'option-1', label: 'Option & Special' },
        { value: 'option_2', label: 'Option with "quotes"' },
        { value: 'option3', label: 'Option with <tags>' },
      ];
      render(
        <FilterSelect
          {...defaultProps}
          options={specialOptions}
          value='option-1'
        />
      );

      expect(screen.getByText('Option & Special')).toBeInTheDocument();
    });
  });

  describe('Icon behavior', () => {
    it('renders different icons', () => {
      const { rerender } = render(
        <FilterSelect {...defaultProps} icon={Calendar} />
      );

      let trigger = screen.getByRole('combobox');
      let icons = trigger.querySelectorAll('svg');
      expect(icons).toHaveLength(2); // Calendar icon + chevron

      rerender(<FilterSelect {...defaultProps} icon={Filter} />);

      trigger = screen.getByRole('combobox');
      icons = trigger.querySelectorAll('svg');
      expect(icons).toHaveLength(2); // Filter icon + chevron
    });

    it('applies correct icon classes', () => {
      render(<FilterSelect {...defaultProps} icon={Calendar} />);

      const trigger = screen.getByRole('combobox');
      const icon = trigger.querySelector('svg');
      expect(icon).toHaveClass('w-4', 'h-4', 'mr-1', 'hidden', 'lg:block');
    });
  });

  describe('Responsive behavior', () => {
    it('applies responsive classes correctly', () => {
      render(<FilterSelect {...defaultProps} />);

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveClass('w-full', 'sm:w-44', 'md:w-52');
    });

    it('icon is hidden on smaller screens', () => {
      render(<FilterSelect {...defaultProps} icon={Calendar} />);

      const trigger = screen.getByRole('combobox');
      const icon = trigger.querySelector('svg');
      expect(icon).toHaveClass('hidden', 'lg:block');
    });
  });

  describe('Edge cases', () => {
    it('handles undefined value', () => {
      render(<FilterSelect {...defaultProps} value={undefined as any} />);

      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('handles null value', () => {
      render(<FilterSelect {...defaultProps} value={null as any} />);

      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('handles empty string value', () => {
      render(<FilterSelect {...defaultProps} value='' />);

      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('handles options with empty labels', () => {
      const optionsWithEmptyLabels = [
        { value: 'option1', label: '' },
        { value: 'option2', label: 'Option 2' },
      ];
      render(
        <FilterSelect
          {...defaultProps}
          options={optionsWithEmptyLabels}
          value='option2'
        />
      );

      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('handles options with duplicate values', () => {
      const duplicateOptions = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option1', label: 'Option 1 Duplicate' },
      ];
      render(
        <FilterSelect
          {...defaultProps}
          options={duplicateOptions}
          value='option1'
        />
      );
      expect(screen.getByRole('combobox')).toBeInTheDocument();
      // Value text is not guaranteed, so we do not assert it
    });
  });

  describe('TypeScript generics', () => {
    it('works with string literal types', () => {
      type TestType = 'option1' | 'option2' | 'option3';

      const typedOptions: Array<{ value: TestType; label: string }> = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
      ];

      render(
        <FilterSelect<TestType>
          value='option1'
          onValueChange={vi.fn()}
          options={typedOptions}
        />
      );

      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  describe('Props validation', () => {
    it('accepts all required props', () => {
      const props: FilterSelectProps<string> = {
        value: 'test',
        onValueChange: vi.fn(),
        options: [{ value: 'test', label: 'Test' }],
        placeholder: 'Custom placeholder',
        icon: Calendar,
        iconClassName: 'custom-icon-class',
        triggerClassName: 'custom-trigger-class',
        itemClassName: 'custom-item-class',
        containerClassName: 'custom-container-class',
        showIcon: true,
        responsive: true,
      };

      render(<FilterSelect {...props} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });
});
