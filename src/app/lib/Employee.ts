import { TaxFile } from "./TaxFile";
import {
    IEntity
} from "./IEntity";

export class Employee implements IEntity {

    resourceName: string = "employee";
    id: number = 0;
    firstname: string = '';
    lastname: string = ''
    age: number = 0;
    created: Date = new Date();
    updated: Date = new Date();
    taxFile: TaxFile = new TaxFile();

    constructor() { }

}