import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';
import {
  REGIONS,
  TIME_RANGES,
  AGE_GROUPS,
  STUDY_TYPES,
  TrendMetricName,
  AgeGroup,
  StudyType,
} from '../../shared/types/dashboard';

// Generate dates for the past 30 days
const generateDatesForPastDays = (days) => {
  const dates: string[] = [];
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
};

const dates = generateDatesForPastDays(30);

// Generate summary metrics by date range and region
const generateSummaryMetrics = () => {
  const generateMetricsForRange = (multiplier) => {
    const baseParticipants = faker.number.int({ min: 8000, max: 12000 });
    const totalParticipants = Math.floor(baseParticipants * multiplier);
    const activeParticipants = faker.number.int({
      min: Math.floor(totalParticipants * 0.6),
      max: Math.floor(totalParticipants * 0.9),
    });
    const totalStudies = faker.number.int({ min: 40, max: 80 });
    const activeStudies = faker.number.int({
      min: Math.floor(totalStudies * 0.3),
      max: Math.floor(totalStudies * 0.7),
    });

    return {
      totalParticipants,
      activeParticipants,
      totalStudies,
      activeStudies,
      averageEligibilityRate: faker.number.float({
        min: 25,
        max: 45,
        multipleOf: 0.1,
      }),
      completionRate: faker.number.float({
        min: 60,
        max: 80,
        multipleOf: 0.1,
      }),
    };
  };

  // Use imported constants
  const TIME_RANGE_KEYS = Object.values(TIME_RANGES);
  const REGION_KEYS = Object.values(REGIONS).filter((r) => r !== REGIONS.ALL);
  const STUDY_TYPE_KEYS = Object.values(STUDY_TYPES);

  // Build the new structure
  const summary = {};
  TIME_RANGE_KEYS.forEach((range) => {
    summary[range] = {};
    // Add overall metrics as 'all'
    const overallMultiplier =
      range === TIME_RANGES.SEVEN_DAYS
        ? 1
        : range === TIME_RANGES.FOURTEEN_DAYS
        ? 1.5
        : 2.2;
    summary[range]['all'] = {};
    STUDY_TYPE_KEYS.forEach((studyType) => {
      summary[range]['all'][studyType] =
        generateMetricsForRange(overallMultiplier);
    });

    // Add each region
    REGION_KEYS.forEach((region) => {
      const regionMultiplier =
        range === TIME_RANGES.SEVEN_DAYS
          ? 0.3
          : range === TIME_RANGES.FOURTEEN_DAYS
          ? 0.5
          : 0.8;
      summary[range][region] = {};
      STUDY_TYPE_KEYS.forEach((studyType) => {
        summary[range][region][studyType] =
          generateMetricsForRange(regionMultiplier);
      });
    });
  });

  return summary;
};

// Generate trend data for different metrics
const generateTrendData = () => {
  const generateMetricData = (
    name: TrendMetricName,
    minVal: number,
    maxVal: number
  ) => ({
    name,
    data: dates.map((date) => ({
      date,
      value: faker.number.int({ min: minVal, max: maxVal }),
    })),
  });

  const metrics = [
    generateMetricData('studyApplications', 150, 450),
    generateMetricData('studyCompletions', 100, 300),
    generateMetricData('newParticipants', 50, 150),
  ];

  // Generate regional trend data
  const regionalMetrics = {};
  Object.values(REGIONS)
    .filter((r) => r !== REGIONS.ALL)
    .forEach((region) => {
      regionalMetrics[region] = [
        generateMetricData('studyApplications', 20, 80),
        generateMetricData('studyCompletions', 15, 60),
        generateMetricData('newParticipants', 8, 30),
      ];
    });

  // Build the new structure
  const TIME_RANGE_KEYS = Object.values(TIME_RANGES);
  const REGION_KEYS = Object.values(REGIONS).filter((r) => r !== REGIONS.ALL);
  const STUDY_TYPE_KEYS = Object.values(STUDY_TYPES);
  const trends = {};
  TIME_RANGE_KEYS.forEach((range) => {
    let days = 7;
    if (range === TIME_RANGES.FOURTEEN_DAYS) days = 14;
    if (range === TIME_RANGES.THIRTY_DAYS) days = 30;
    trends[range] = {};
    // All (overall)
    trends[range]['all'] = {};
    STUDY_TYPE_KEYS.forEach((studyType) => {
      trends[range]['all'][studyType] = {
        interval: 'day',
        metrics: metrics.map((metric) => ({
          name: metric.name,
          data: metric.data.slice(-days),
        })),
      };
    });
    // Each region
    REGION_KEYS.forEach((region) => {
      trends[range][region] = {};
      STUDY_TYPE_KEYS.forEach((studyType) => {
        trends[range][region][studyType] = {
          interval: 'day',
          metrics: regionalMetrics[region].map((metric) => ({
            name: metric.name,
            data: metric.data.slice(-days),
          })),
        };
      });
    });
  });
  return trends;
};

// Generate comparison data across different dimensions
const generateComparisonData = () => {
  // Generate base comparison data for a single time range and region
  const generateComparisonForRangeAndRegion = (timeRange: string) => {
    const multiplier =
      timeRange === TIME_RANGES.SEVEN_DAYS
        ? 1
        : timeRange === TIME_RANGES.FOURTEEN_DAYS
        ? 1.5
        : 2.2;
    // Study type comparison
    const studyTypeComparison = {
      dimension: 'studyType',
      metrics: Object.values(STUDY_TYPES).map((type: StudyType) => ({
        name: type,
        applications: Math.floor(
          faker.number.int({ min: 500, max: 4000 }) * multiplier
        ),
        completions: Math.floor(
          faker.number.int({ min: 150, max: 3000 }) * multiplier
        ),
      })),
    };

    // Regional comparison
    const regionalComparison = {
      dimension: 'region',
      metrics: Object.values(REGIONS)
        .filter((r) => r !== REGIONS.ALL)
        .map((region) => ({
          name: region,
          applications: Math.floor(
            faker.number.int({ min: 800, max: 5000 }) * multiplier
          ),
          completions: Math.floor(
            faker.number.int({ min: 200, max: 3500 }) * multiplier
          ),
        })),
    };

    // Age group comparison
    const ageGroupComparison = {
      dimension: 'ageGroup',
      metrics: AGE_GROUPS.map((group: AgeGroup) => ({
        name: group,
        applications: Math.floor(
          faker.number.int({ min: 300, max: 4000 }) * multiplier
        ),
        completions: Math.floor(
          faker.number.int({ min: 80, max: 3000 }) * multiplier
        ),
      })),
    };

    return {
      studyType: studyTypeComparison,
      ageGroup: ageGroupComparison,
      region: regionalComparison,
    };
  };

  // Build the new structure
  const TIME_RANGE_KEYS = Object.values(TIME_RANGES);
  const comparisons = {};

  TIME_RANGE_KEYS.forEach((range) => {
    comparisons[range] = generateComparisonForRangeAndRegion(range);
  });

  return comparisons;
};

// Generate demographic data
const generateDemographicData = () => {
  // Generate base demographic data for a single time range and region
  const generateDemographicsForRangeAndRegion = (
    timeRange: string,
    region: string
  ) => {
    const multiplier =
      timeRange === TIME_RANGES.SEVEN_DAYS
        ? 1
        : timeRange === TIME_RANGES.FOURTEEN_DAYS
        ? 1.5
        : 2.2;
    const regionMultiplier = region === 'all' ? 1 : 0.3;

    const demographics = {
      gender: {
        dimension: 'gender',
        metrics: ['Male', 'Female', 'Non-binary', 'Prefer not to say'].map(
          (gender) => ({
            name: gender,
            count: Math.floor(
              faker.number.int({ min: 500, max: 6000 }) *
                multiplier *
                regionMultiplier
            ),
            percentage: faker.number.float({
              min: 5,
              max: 50,
              multipleOf: 0.1,
            }),
          })
        ),
      },
      ageDistribution: {
        dimension: 'ageDistribution',
        metrics: AGE_GROUPS.map((ageGroup: AgeGroup) => ({
          name: ageGroup,
          count: Math.floor(
            faker.number.int({ min: 100, max: 1500 }) *
              multiplier *
              regionMultiplier
          ),
          percentage: faker.number.float({ min: 8, max: 25, multipleOf: 0.1 }),
        })),
      },
      education: {
        dimension: 'education',
        metrics: [
          'High School',
          'Associate Degree',
          "Bachelor's Degree",
          "Master's Degree",
          'Doctoral Degree',
          'Other',
        ].map((level) => ({
          name: level,
          count: Math.floor(
            faker.number.int({ min: 200, max: 4000 }) *
              multiplier *
              regionMultiplier
          ),
          percentage: faker.number.float({ min: 3, max: 35, multipleOf: 0.1 }),
        })),
      },
      employment: {
        dimension: 'employment',
        metrics: [
          'Full-time',
          'Part-time',
          'Self-employed',
          'Unemployed',
          'Student',
          'Retired',
        ].map((status) => ({
          name: status,
          count: Math.floor(
            faker.number.int({ min: 300, max: 5000 }) *
              multiplier *
              regionMultiplier
          ),
          percentage: faker.number.float({ min: 5, max: 40, multipleOf: 0.1 }),
        })),
      },
    };

    return demographics;
  };

  // Build the new structure
  const TIME_RANGE_KEYS = Object.values(TIME_RANGES);
  const REGION_KEYS = Object.values(REGIONS);
  const STUDY_TYPE_KEYS = Object.values(STUDY_TYPES);
  const demographicData = {};

  TIME_RANGE_KEYS.forEach((range) => {
    demographicData[range] = {};
    REGION_KEYS.forEach((region) => {
      demographicData[range][region] = {};
      STUDY_TYPE_KEYS.forEach((studyType) => {
        demographicData[range][region][studyType] =
          generateDemographicsForRangeAndRegion(range, region);
      });
    });
  });

  return demographicData;
};

// Combine all the data
const mockData = {
  summary: generateSummaryMetrics(),
  trends: generateTrendData(),
  comparisons: generateComparisonData(),
  demographics: generateDemographicData(),
  metadata: {
    generatedAt: new Date().toISOString(),
    dateRange: {
      start: dates[0],
      end: dates[dates.length - 1],
    },
    regions: REGIONS,
    studyTypes: STUDY_TYPES,
  },
};

// Create output directory if it doesn't exist
const outputDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(
  path.join(outputDir, 'summary.json'),
  JSON.stringify(mockData.summary, null, 2)
);

fs.writeFileSync(
  path.join(outputDir, 'trends.json'),
  JSON.stringify(mockData.trends, null, 2)
);

fs.writeFileSync(
  path.join(outputDir, 'comparisons.json'),
  JSON.stringify(mockData.comparisons, null, 2)
);

fs.writeFileSync(
  path.join(outputDir, 'demographics.json'),
  JSON.stringify(mockData.demographics, null, 2)
);
