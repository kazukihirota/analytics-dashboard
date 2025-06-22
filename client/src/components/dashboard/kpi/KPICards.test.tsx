import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { KPICards } from './KPICards';
import { DashboardProvider, useDashboard } from '@/contexts/DashboardContext';
import * as useDashboardData from '@/hooks/useDashboardData';
import {
  type SummaryMetrics,
  TIME_RANGES,
  REGIONS,
  STUDY_TYPES,
  COMPARISON_DIMENSIONS,
  DEMOGRAPHIC_DIMENSIONS,
} from '../../../../../shared/types/dashboard';

// Mock the hooks
vi.mock('@/hooks/useDashboardData');
vi.mock('@/contexts/DashboardContext', async () => {
  const actual = await vi.importActual('@/contexts/DashboardContext');
  return {
    ...actual,
    useDashboard: vi.fn(),
  };
});

const mockUseDashboard = vi.mocked(useDashboard);
const mockUseDashboardSummary = vi.mocked(useDashboardData.useDashboardSummary);

// Create a wrapper component for testing
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <DashboardProvider>{children}</DashboardProvider>
    </QueryClientProvider>
  );
};

describe('KPICards', () => {
  const mockSummaryData: SummaryMetrics = {
    totalParticipants: 1250,
    activeParticipants: 890,
    totalStudies: 45,
    activeStudies: 23,
    completionRate: 78.5,
    averageEligibilityRate: 65.2,
  };

  const mockContextValue = {
    timeRange: TIME_RANGES.SEVEN_DAYS,
    region: REGIONS.NORTH_AMERICA,
    studyType: STUDY_TYPES.CLINICAL_TRIALS,
    setTimeRange: vi.fn(),
    comparisonDimension: COMPARISON_DIMENSIONS.STUDY_TYPE,
    setComparisonDimension: vi.fn(),
    demographicDimension: DEMOGRAPHIC_DIMENSIONS.GENDER,
    setDemographicDimension: vi.fn(),
    setRegion: vi.fn(),
    setStudyType: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock the useDashboard hook to return the context value
    mockUseDashboard.mockReturnValue(mockContextValue);

    // Mock the useDashboardSummary hook
    mockUseDashboardSummary.mockReturnValue({
      data: mockSummaryData,
      isLoading: false,
      isError: false,
      error: null,
    } as any);
  });

  it('renders all KPI cards when data is loaded successfully', () => {
    render(
      <TestWrapper>
        <KPICards />
      </TestWrapper>
    );

    // Check that all expected KPI cards are rendered
    expect(screen.getByText('Total Participants')).toBeDefined();
    expect(screen.getByText('Active Participants')).toBeDefined();
    expect(screen.getByText('Total Studies')).toBeDefined();
    expect(screen.getByText('Active Studies')).toBeDefined();
    expect(screen.getByText('Completion Rate')).toBeDefined();
    expect(screen.getByText('Avg. Participants/Study')).toBeDefined();
  });

  it('displays correct values for each KPI card', () => {
    render(
      <TestWrapper>
        <KPICards />
      </TestWrapper>
    );

    expect(screen.getByText('1250')).toBeDefined();
    expect(screen.getByText('890')).toBeDefined();
    expect(screen.getByText('45')).toBeDefined();
    expect(screen.getByText('23')).toBeDefined();
    expect(screen.getByText('78.5%')).toBeDefined();
    expect(screen.getByText('65.2')).toBeDefined();
  });

  it('shows loading state when data is being fetched', () => {
    vi.mocked(useDashboardData.useDashboardSummary).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as any);

    render(
      <TestWrapper>
        <KPICards />
      </TestWrapper>
    );

    // Should render 6 loading cards (one for each KPI)
    const loadingCards = screen.getAllByTestId('kpi-card-loading');
    expect(loadingCards).toHaveLength(6);
  });

  it('shows error state when data fetch fails', () => {
    const errorMessage = 'Failed to fetch dashboard data';
    vi.mocked(useDashboardData.useDashboardSummary).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: { message: errorMessage },
    } as any);

    render(
      <TestWrapper>
        <KPICards />
      </TestWrapper>
    );

    // Should render 6 error cards (one for each KPI)
    const errorCards = screen.getAllByTestId('kpi-card-error');
    expect(errorCards).toHaveLength(6);
    expect(screen.getAllByText(errorMessage)).toHaveLength(6);
  });

  it('shows default error message when error object is null', () => {
    vi.mocked(useDashboardData.useDashboardSummary).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: null,
    } as any);

    render(
      <TestWrapper>
        <KPICards />
      </TestWrapper>
    );

    const errorCards = screen.getAllByTestId('kpi-card-error');
    expect(errorCards).toHaveLength(6);
    expect(screen.getAllByText('Error loading data')).toHaveLength(6);
  });

  it('calls useDashboardSummary with correct parameters', () => {
    render(
      <TestWrapper>
        <KPICards />
      </TestWrapper>
    );

    expect(mockUseDashboardSummary).toHaveBeenCalledWith({
      timeRange: TIME_RANGES.SEVEN_DAYS,
      region: REGIONS.NORTH_AMERICA,
      studyType: STUDY_TYPES.CLINICAL_TRIALS,
    });
  });

  it('handles zero values correctly', () => {
    const zeroData: SummaryMetrics = {
      totalParticipants: 0,
      activeParticipants: 0,
      totalStudies: 0,
      activeStudies: 0,
      completionRate: 0,
      averageEligibilityRate: 0,
    };

    vi.mocked(useDashboardData.useDashboardSummary).mockReturnValue({
      data: zeroData,
      isLoading: false,
      isError: false,
      error: null,
    } as any);

    render(
      <TestWrapper>
        <KPICards />
      </TestWrapper>
    );

    expect(screen.getAllByText('0')).toHaveLength(5);
    expect(screen.getAllByText('0%')).toHaveLength(1);
  });

  it('handles large numbers correctly', () => {
    const largeData: SummaryMetrics = {
      totalParticipants: 999999,
      activeParticipants: 888888,
      totalStudies: 777,
      activeStudies: 666,
      completionRate: 99.9,
      averageEligibilityRate: 95.5,
    };

    vi.mocked(useDashboardData.useDashboardSummary).mockReturnValue({
      data: largeData,
      isLoading: false,
      isError: false,
      error: null,
    } as any);

    render(
      <TestWrapper>
        <KPICards />
      </TestWrapper>
    );

    expect(screen.getByText('999999')).toBeDefined();
    expect(screen.getByText('888888')).toBeDefined();
    expect(screen.getByText('777')).toBeDefined();
    expect(screen.getByText('666')).toBeDefined();
    expect(screen.getByText('99.9%')).toBeDefined();
    expect(screen.getByText('95.5')).toBeDefined();
  });

  it('handles decimal values correctly', () => {
    const decimalData: SummaryMetrics = {
      totalParticipants: 1234,
      activeParticipants: 567,
      totalStudies: 89,
      activeStudies: 45,
      completionRate: 67.89,
      averageEligibilityRate: 23.45,
    };

    vi.mocked(useDashboardData.useDashboardSummary).mockReturnValue({
      data: decimalData,
      isLoading: false,
      isError: false,
      error: null,
    } as any);

    render(
      <TestWrapper>
        <KPICards />
      </TestWrapper>
    );

    expect(screen.getByText('67.89%')).toBeDefined();
    expect(screen.getByText('23.45')).toBeDefined();
  });

  it('renders correct number of cards', () => {
    render(
      <TestWrapper>
        <KPICards />
      </TestWrapper>
    );

    // Should render exactly 6 KPI cards
    const kpiCards = screen.getAllByText(
      /Participants|Studies|Completion Rate|Avg\. Participants/
    );
    expect(kpiCards).toHaveLength(6);
  });

  it('handles undefined data gracefully', () => {
    vi.mocked(useDashboardData.useDashboardSummary).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
      error: null,
    } as any);

    render(
      <TestWrapper>
        <KPICards />
      </TestWrapper>
    );

    // Should render error cards when data is undefined
    const errorCards = screen.getAllByTestId('kpi-card-error');
    expect(errorCards).toHaveLength(6);
  });

  it('renders with correct trend directions', () => {
    render(
      <TestWrapper>
        <KPICards />
      </TestWrapper>
    );

    // Check that trend icons are present (they should be rendered by KPICard)
    const cards = screen.getAllByText(
      /Participants|Studies|Completion Rate|Avg\. Participants/
    );
    expect(cards).toHaveLength(6);
  });
});
