import {
  createContext,
  useContext,
  useState,
  type FC,
  type ReactNode,
} from 'react';
import {
  type TimeRange,
  TIME_RANGES,
  type Region,
  REGIONS,
  type ComparisonDimension,
  COMPARISON_DIMENSIONS,
  type DemographicDimension,
  DEMOGRAPHIC_DIMENSIONS,
  type StudyType,
  STUDY_TYPES,
} from '../../../shared/types/dashboard';

interface DashboardContextType {
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
  comparisonDimension: ComparisonDimension;
  setComparisonDimension: (dimension: ComparisonDimension) => void;
  region: Region;
  setRegion: (region: Region) => void;
  demographicDimension: DemographicDimension;
  setDemographicDimension: (dimension: DemographicDimension) => void;
  studyType: StudyType;
  setStudyType: (studyType: StudyType) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider: FC<DashboardProviderProps> = ({ children }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>(TIME_RANGES.SEVEN_DAYS);
  const [comparisonDimension, setComparisonDimension] =
    useState<ComparisonDimension>(COMPARISON_DIMENSIONS.STUDY_TYPE);
  const [region, setRegion] = useState<Region>(REGIONS.NORTH_AMERICA);
  const [demographicDimension, setDemographicDimension] =
    useState<DemographicDimension>(DEMOGRAPHIC_DIMENSIONS.GENDER);
  const [studyType, setStudyType] = useState<StudyType>(
    STUDY_TYPES.CLINICAL_TRIALS
  );

  return (
    <DashboardContext.Provider
      value={{
        timeRange,
        setTimeRange,
        comparisonDimension,
        setComparisonDimension,
        region,
        setRegion,
        demographicDimension,
        setDemographicDimension,
        studyType,
        setStudyType,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
