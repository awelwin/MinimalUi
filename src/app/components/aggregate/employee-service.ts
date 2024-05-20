
import { Observable } from "rxjs";
import { RestService } from "../../services/RestService";
import { Injectable } from "@angular/core";
import { HttpEvent } from "@angular/common/http";
import { Employee } from "../../lib/Employee";

@Injectable()
export class EmployeeService {

    readonly RESOURCE_NAME: string = "employee";

    constructor(private restService: RestService) { }

    /** Get entity by id */
    getWithId(id: number): Observable<Employee> {
        return this.restService.getWithId<Employee>(id, this.RESOURCE_NAME);
    }

    /* @param entityName 
    * @returns 
    */
    list(): Observable<Employee[]> {
        return this.restService.get<Employee>(this.RESOURCE_NAME);
    }

    delete(id: number): Observable<HttpEvent<any>> {
        return this.restService.delete(this.RESOURCE_NAME, id);
    }
}