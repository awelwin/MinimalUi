
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

/**Provide global configuration settings for http operations
 */

export class RestService {

    _serviceUri: string = "";
    requestOptions: Object = { withCredentials: false, responseType: 'json' };
    _http!: HttpClient;

    /** constructor */
    constructor(http: HttpClient, serviceUri: string) {

        this._http = http;
        this._serviceUri = serviceUri;
    }



    /**
     * Get resource by id
     * @param id resource unique id
     * @param resource Rest resource name
     */
    public getWithId<T>(id: number, resourceName: string): Observable<T> {

        var url = this._serviceUri + resourceName + "/" + id;
        return this._http.get<T>(url, this.requestOptions)

    }

    /**
     * Post resource
     */
    public post<T>(resource: T, resourceName: string): Observable<T> {

        //resource identifier
        var url = this._serviceUri + resourceName

        return this._http.post<T>(url, resource, this.requestOptions)
    }

    /**
     * List resource
     */
    public get<T>(resourceName: string): Observable<T[]> {
        //resource identifier
        var url = this._serviceUri + resourceName;

        return this._http.get<T[]>(url, this.requestOptions)
    }

    /**
     * Find entities matching query string
     * @param queryString http queryString. Must exclude '?' prefix character. 
     */
    public getWithQuery<T>(resourceName: string, queryString: string): Observable<Array<T>> {

        var url = this._serviceUri + resourceName + "?" + queryString;
        return this._http.get<Array<T>>(url, this.requestOptions)

    }

    /**
     * Update resource
     * @param resource resource instance to persist
     */
    public put<T>(resourceName: string, id: number, resource: T): Observable<HttpEvent<any>> {
        let url = this._serviceUri + resourceName + "/" + id;
        return this._http.put<HttpEvent<any>>(url, resource, this.requestOptions);
    }

    /**
     * Delete entity
     * @param id id of resource to delete
     */
    public delete(resourceName: string, id: number): Observable<HttpEvent<any>> {
        let url = this._serviceUri + resourceName + "/" + id;
        return this._http.delete<HttpEvent<any>>(url, this.requestOptions);
    }
}