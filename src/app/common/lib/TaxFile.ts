import { TaxFileRecord } from './TaxFileRecord';

export class TaxFile {
    Id: number = 0
    Alias: string = '';
    EmployeeId: number = 0;
    Created: Date = new Date();
    Updated: Date = new Date();
    TaxFileRecords: TaxFileRecord[] = [];

    constructor() { }
}
