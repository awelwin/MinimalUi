import { TaxFile } from "./TaxFile";

export class Employee {

    Id: number = 0;
    Firstname: string = '';
    Lastname: string = ''
    Age: number = 0;
    Created: Date = new Date();
    Updated: Date = new Date();
    TaxFile: TaxFile = new TaxFile();

    constructor() { }

}