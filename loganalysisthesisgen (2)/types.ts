// Global types for TypeScript

// Augment navigator for IE/Edge specific method
declare global {
  interface Navigator {
    msSaveOrOpenBlob?: (blob: Blob, defaultName?: string) => boolean;
  }
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface TrainingMetric {
  iter: number;
  rmse: number;
}