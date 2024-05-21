import { identifierName } from '@angular/compiler';
import { TaxFileRecord } from './TaxFileRecord';
import { IEntity } from './IEntity';

export class TaxFile implements IEntity {

    readonly resourceName: string = "";
    id: number = 0
    alias: string = '';
    employeeId: number = 0;
    created: Date = new Date();
    updated: Date = new Date();
    taxFileRecords: TaxFileRecord[] = [];

    constructor() { }
}
