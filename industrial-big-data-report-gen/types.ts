export interface StudentConfig {
  id: 1 | 2 | 3 | 4;
  name: string;
  studentId: string;
  className: string;
  personalizedData: {
    customField: string;
    addedRecords: number;
    udiRange: [number, number];
    customFieldLogic: string;
  };
  analysisFocus: {
    focusArea: string;
    topFaultTypes: string[];
    insightType: string;
  };
  techStack: {
    database: 'HBase' | 'MongoDB';
    tableName: string;
    rowKeyDesign: string;
    mapReduceAlgorithm: string;
  };
  visualTheme: {
    terminal: 'ubuntu' | 'putty' | 'kali' | 'macos';
    chartColors: string[];
  };
  terminalConfig: {
    user: string;
    host: string;
    path: string;
    promptChar: string;
  };
  writingStyle: 'detailed' | 'concise' | 'technical' | 'practical';
}

export interface BaseStats {
  totalRecords: number;
  typeDistribution: { L: number; M: number; H: number };
  totalFailures: number;
  failureRate: number;
  faultCounts: { [key: string]: number };
  avgByType: {
    [key: string]: { temp: number; rpm: number; torque: number; failureRate: number };
  };
}