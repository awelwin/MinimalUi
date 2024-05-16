
import { Observable } from "rxjs";
import { RestService } from "../../services/RestService";
import { Injectable } from "@angular/core";
import { HttpEvent } from "@angular/common/http";

/**
 * Please Ensure setEntityName() is called to initialize service.
 */
@Injectable()
export class AggregateService<T> {

    _entityName: string = "";
    constructor(private restService: RestService) { }

    /** Get entity by id */
    getWithId<T>(id: number): Observable<T> {
        return this.restService.getWithId<T>(id, this.verifyEntityName());
    }

    /* @param entityName 
    * @returns 
    */
    list<T>(): Observable<T[]> {
        return this.restService.get<T>(this.verifyEntityName());
    }

    delete(id: number): Observable<HttpEvent<any>> {
        return this.restService.delete(this.verifyEntityName(), id);
    }


    /**
     * DUE TO LIMITATION WITH TYPESCRIPT GENERICS WE CANT GET TypeName of T which is used for mapping Entity --> Rest Resource
     * This method must be called to initialize service with an entity name prior to executing service calls.
     * @param name Entity name
     */
    public initialize(name: string) {
        this._entityName = name;
    }

    verifyEntityName(): string {
        if (this._entityName == "" || this._entityName == null)
            throw new RangeError("setEntityName() must be called to initialise service before service can be active.");
        else
            return this._entityName;
    }
}