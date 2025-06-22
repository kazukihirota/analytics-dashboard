import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Home } from 'lucide-react';
import { KPICard, type KPICardProps } from './KPICard';

describe('KPICard', () => {
  const defaultProps: KPICardProps = {
    icon: Home,
    title: 'Total Sales',
    value: '$1,234',
    subtitle: '+12% from last month',
    trendDirection: 'up',
  };

  it('renders all required props correctly', () => {
    render(<KPICard {...defaultProps} />);

    expect(screen.getByText('Total Sales')).toBeDefined();
    expect(screen.getByText('$1,234')).toBeDefined();
    expect(screen.getByText('+12% from last month')).toBeDefined();
  });

  it('renders the icon correctly', () => {
    render(<KPICard {...defaultProps} />);

    const icon = screen
      .getByText('Total Sales')
      .closest('div')
      ?.querySelector('svg');
    expect(icon).toBeDefined();
  });

  it('shows trending up icon when trendDirection is up', () => {
    render(<KPICard {...defaultProps} trendDirection='up' />);

    const trendIcon = screen
      .getByText('$1,234')
      .closest('div')
      ?.querySelector('svg');
    expect(trendIcon).toBeDefined();
  });

  it('shows trending down icon when trendDirection is down', () => {
    render(<KPICard {...defaultProps} trendDirection='down' />);

    const trendIcon = screen
      .getByText('$1,234')
      .closest('div')
      ?.querySelector('svg');
    expect(trendIcon).toBeDefined();
  });

  it('shows minus icon when trendDirection is neutral', () => {
    render(<KPICard {...defaultProps} trendDirection='neutral' />);

    const trendIcon = screen
      .getByText('$1,234')
      .closest('div')
      ?.querySelector('svg');
    expect(trendIcon).toBeDefined();
  });

  it('uses default trendDirection up when not provided', () => {
    render(<KPICard {...defaultProps} />);

    const trendIcon = screen
      .getByText('$1,234')
      .closest('div')
      ?.querySelector('svg');
    expect(trendIcon).toBeDefined();
  });

  it('handles different value formats', () => {
    const propsWithPercentage = {
      ...defaultProps,
      value: '85%',
      subtitle: 'Completion rate',
    };

    render(<KPICard {...propsWithPercentage} />);
    expect(screen.getByText('85%')).toBeDefined();
    expect(screen.getByText('Completion rate')).toBeDefined();
  });

  it('handles numeric values', () => {
    const propsWithNumber = {
      ...defaultProps,
      value: '1,234',
      subtitle: 'Total participants',
    };

    render(<KPICard {...propsWithNumber} />);
    expect(screen.getByText('1,234')).toBeDefined();
    expect(screen.getByText('Total participants')).toBeDefined();
  });

  it('renders with long titles', () => {
    const propsWithLongTitle = {
      ...defaultProps,
      title: 'Very Long KPI Title That Might Wrap',
    };

    render(<KPICard {...propsWithLongTitle} />);
    expect(
      screen.getByText('Very Long KPI Title That Might Wrap')
    ).toBeDefined();
  });

  it('renders with long values', () => {
    const propsWithLongValue = {
      ...defaultProps,
      value: '$1,234,567,890',
      subtitle: 'Very large amount',
    };

    render(<KPICard {...propsWithLongValue} />);
    expect(screen.getByText('$1,234,567,890')).toBeDefined();
    expect(screen.getByText('Very large amount')).toBeDefined();
  });

  it('renders with long subtitles', () => {
    const propsWithLongSubtitle = {
      ...defaultProps,
      subtitle:
        'This is a very long subtitle that might wrap to multiple lines',
    };

    render(<KPICard {...propsWithLongSubtitle} />);
    expect(
      screen.getByText(
        'This is a very long subtitle that might wrap to multiple lines'
      )
    ).toBeDefined();
  });

  it('applies correct CSS classes for responsive design', () => {
    render(<KPICard {...defaultProps} />);

    const card = screen.getByText('Total Sales').closest('.border-0');
    expect(card?.className).toContain('shadow-sm');
    expect(card?.className).toContain('text-center');
    expect(card?.className).toContain('flex');
    expect(card?.className).toContain('items-center');
    expect(card?.className).toContain('justify-center');
  });

  it('renders subtitle with correct responsive classes', () => {
    render(<KPICard {...defaultProps} />);

    const subtitle = screen.getByText('+12% from last month');
    expect(subtitle.className).toContain('hidden');
    expect(subtitle.className).toContain('xl:block');
  });

  it('renders value with correct responsive text sizes', () => {
    render(<KPICard {...defaultProps} />);

    const value = screen.getByText('$1,234');
    expect(value.className).toContain('text-base');
    expect(value.className).toContain('xl:text-2xl');
    expect(value.className).toContain('font-bold');
  });

  it('renders title with correct responsive text sizes', () => {
    render(<KPICard {...defaultProps} />);

    const title = screen.getByText('Total Sales');
    expect(title.className).toContain('text-xs');
    expect(title.className).toContain('xl:text-sm');
  });
});
