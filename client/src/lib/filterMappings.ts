import { FILTER_VALUE_MAPPINGS } from '@/constants/dashboard';
import type {
  Region,
  StudyType,
  TimeRange,
  ComparisonDimension,
  DemographicDimension,
} from '../../../shared/types/dashboard';
import _ from 'lodash';

export function formatFilterDescription({
  timeRange,
  region,
  studyType,
}: {
  timeRange?: TimeRange;
  region?: Region;
  studyType?: StudyType;
}): string {
  const parts: string[] = [];

  if (timeRange) {
    parts.push(getMappedTimeRange(timeRange));
  }

  if (region) {
    parts.push(getMappedRegion(region));
  }

  if (studyType) {
    parts.push(getMappedStudyType(studyType));
  }

  return parts.join(', ');
}

export function getMappedTimeRange(value: TimeRange): string {
  return FILTER_VALUE_MAPPINGS.timeRange[value] || value;
}

export function getMappedRegion(value: Region): string {
  return FILTER_VALUE_MAPPINGS.region[value] || value;
}

export function getMappedStudyType(value: StudyType): string {
  return FILTER_VALUE_MAPPINGS.studyType[value] || value;
}

export function getMappedComparisonDimension(
  value: ComparisonDimension
): string {
  return FILTER_VALUE_MAPPINGS.comparisonDimension[value] || value;
}

export function getMappedDemographicDimension(
  value: DemographicDimension
): string {
  return FILTER_VALUE_MAPPINGS.demographicDimension[value] || value;
}

export function formatMetricName(name: string): string {
  const studyTypeMapping = FILTER_VALUE_MAPPINGS.studyType[name as StudyType];
  if (studyTypeMapping) {
    return studyTypeMapping;
  }

  const regionMapping = FILTER_VALUE_MAPPINGS.region[name as Region];
  if (regionMapping) {
    return regionMapping;
  }

  // For age groups, they're already properly formatted
  if (name.match(/^\d+-\d+$/) || name === '65+') {
    return name;
  }

  return _.startCase(name);
}
