import { Request, Response } from 'express';
export interface MachineData {
    UDI: string;
    'Product ID': string;
    Type: string;
    'Air temperature [K]': string;
    'Process temperature [K]': string;
    'Rotational speed [rpm]': string;
    'Torque [Nm]': string;
    'Tool wear [min]': string;
    'Machine failure': string;
    TWF: string;
    HDF: string;
    PWF: string;
    OSF: string;
    RNF: string;
    Maintenance_Cycle: string;
    Load_Level: string;
}
export declare class DataController {
    private data;
    private dataLoaded;
    private loadData;
    private ensureDataLoaded;
    getSummary(req: Request, res: Response): Promise<void>;
    getFaultsDistribution(req: Request, res: Response): Promise<void>;
    getParameterStats(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=DataController.d.ts.map