import { TaxFileRecord } from './TaxFileRecord';

export class TaxFile {
    id: number = 0
    alias: string = '';
    employeeId: number = 0;
    created: Date = new Date();
    updated: Date = new Date();
    taxFileRecords: TaxFileRecord[] = [];

    constructor() { }
}
