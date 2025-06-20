import {
  TIME_RANGES,
  COMPARISON_DIMENSIONS,
  REGIONS,
  STUDY_TYPES,
  TimeRange,
  ComparisonDimension,
  Region,
  StudyType,
  DEMOGRAPHIC_DIMENSIONS,
  DemographicDimension,
} from '../../../shared/types/dashboard';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function validateTimeRange(
  timeRange: any
): asserts timeRange is TimeRange {
  if (!timeRange || !Object.values(TIME_RANGES).includes(timeRange)) {
    throw new ValidationError(
      `Invalid timeRange parameter. Must be one of: ${Object.values(
        TIME_RANGES
      ).join(', ')}`
    );
  }
}

export function validateComparisonDimension(
  dimension: any
): asserts dimension is ComparisonDimension {
  if (!dimension || !Object.values(COMPARISON_DIMENSIONS).includes(dimension)) {
    throw new ValidationError(
      `Invalid dimension parameter. Must be one of: ${Object.values(
        COMPARISON_DIMENSIONS
      ).join(', ')}`
    );
  }
}

export function validateRegion(region: any): asserts region is Region {
  if (!region || !Object.values(REGIONS).includes(region)) {
    throw new ValidationError(
      `Invalid region parameter. Must be one of: ${Object.values(REGIONS).join(
        ', '
      )}`
    );
  }
}

export function validateDemographicDimension(
  dimension: any
): asserts dimension is DemographicDimension {
  if (
    !dimension ||
    !Object.values(DEMOGRAPHIC_DIMENSIONS).includes(dimension)
  ) {
    throw new ValidationError(
      `Invalid dimension parameter. Must be one of: ${Object.values(
        DEMOGRAPHIC_DIMENSIONS
      ).join(', ')}`
    );
  }
}

export function validateStudyType(
  studyType: any
): asserts studyType is StudyType {
  if (!studyType || !Object.values(STUDY_TYPES).includes(studyType)) {
    throw new ValidationError(
      `Invalid studyType parameter. Must be one of: ${Object.values(
        STUDY_TYPES
      ).join(', ')}`
    );
  }
}
