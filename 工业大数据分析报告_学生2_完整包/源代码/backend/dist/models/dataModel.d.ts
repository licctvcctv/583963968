export interface MachineData {
    'UID': string;
    'product ID': string;
    'Type': string;
    'Air temperature [K]': number;
    'Process temperature [K]': number;
    'Rotational speed [rpm]': number;
    'Torque [Nm]': number;
    'Tool wear [min]': number;
    'Machine failure': number;
    'TWF': number;
    'HDF': number;
    'PWF': number;
    'OSF': number;
    'RNF': number;
}
export declare class DataModel {
    private data;
    private dataPath;
    constructor();
    private loadData;
    getData(): MachineData[];
    getSummary(): {
        total: number;
        failures: number;
        failureRate: string;
        failureTypes: {
            TWF: number;
            HDF: number;
            PWF: number;
            OSF: number;
            RNF: number;
        };
    };
    getFaultDistribution(): {
        TWF: number;
        HDF: number;
        PWF: number;
        OSF: number;
        RNF: number;
    };
    getParameterStats(): {
        airTemperature: {
            min: number;
            max: number;
            avg: string;
        };
        processTemperature: {
            min: number;
            max: number;
            avg: string;
        };
        rotationalSpeed: {
            min: number;
            max: number;
            avg: string;
        };
        torque: {
            min: number;
            max: number;
            avg: string;
        };
        toolWear: {
            min: number;
            max: number;
            avg: string;
        };
    };
}
//# sourceMappingURL=dataModel.d.ts.map