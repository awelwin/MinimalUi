import { Observable } from "rxjs";
import { RestService } from "../../common/lib/RestService";
import { EmployeeSearchQueryResult } from "./EmployeeSearchQueryResult";
import { HttpClient } from "@angular/common/http";

export class QueryService extends RestService {

    constructor(http: HttpClient, serviceUri: string) {
        super(http, serviceUri);
    }

    /**
     * @param input search string 
     * @returns Employee search results or empty array []
     */
    public searchEmployee(input: string): Observable<EmployeeSearchQueryResult[]> {
        return this.get<EmployeeSearchQueryResult>('query/employee-search?input=' + input);
    }

}