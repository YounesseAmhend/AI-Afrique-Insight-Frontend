import * as am5 from '@amcharts/amcharts5';

export interface AIReadinessCountryData {
  id: string; // ISO 3166-1 alpha-2 code
  name: string;
  value: number;
}

// For data processed for amCharts series
export interface MapChartDataItem extends AIReadinessCountryData {
  fill?: am5.Color; // amCharts Color object for direct fill
}

export interface ColorScaleItemConfig {
  threshold: number;
  color: string; // Hex color string
}