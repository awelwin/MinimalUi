import { Observable } from "rxjs";
import { EmployeeSearchQueryResult } from "../lib/EmployeeSearchQueryResult";
import { HttpClient } from "@angular/common/http";

export class QueryService {

    constructor(private http: HttpClient, private serviceUri: string) { }

    /**
     * @param input search string 
     * @returns Employee search results or empty array []
     */
    public searchEmployee(input: string): Observable<EmployeeSearchQueryResult[]> {
        return this.http.get<EmployeeSearchQueryResult[]>(this.serviceUri + 'query/employee-search?input=' + input);
    }

}