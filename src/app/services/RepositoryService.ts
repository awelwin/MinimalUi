
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEntity } from '../lib/IEntity';

/**Provide global configuration settings for http operations
 */

export class RepositoryService<T extends IEntity> {

    public instanceId: string = Math.random().toString()
    _serviceUri: string = "";
    requestOptions: Object = { withCredentials: false, responseType: 'json' };
    _http!: HttpClient;
    _resource: string = "";

    /** constructor */
    constructor(http: HttpClient, serviceUri: string, resource: string) {

        this._http = http;
        this._serviceUri = serviceUri;
        this._resource = resource;
    }



    /**
     * Get resource by id
     * @param id resource unique id
     * @param resource Rest resource name
     */
    public getWithId(id: number): Observable<T> {

        var url = this._serviceUri + this._resource + "/" + id;
        return this._http.get<T>(url, this.requestOptions)

    }

    /**
     * Post resource
     */
    public post(resource: T, resourceName: string): Observable<T> {

        //resource identifier
        var url = this._serviceUri + resourceName

        return this._http.post<T>(url, resource, this.requestOptions)
    }

    /**
     * List resource
     */
    public get(): Observable<T[]> {
        //resource identifier
        var url = this._serviceUri + this._resource;

        return this._http.get<T[]>(url, this.requestOptions)
    }

    /**
     * Find entities matching query string
     * @param queryString http queryString. Must exclude '?' prefix character. 
     */
    public getWithQuery(queryString: string): Observable<Array<T>> {

        var url = this._serviceUri + this._resource + "?" + queryString;
        return this._http.get<Array<T>>(url, this.requestOptions)

    }

    /**
     * Update resource
     * @param resource resource instance to persist
     */
    public put(id: number, resource: T): Observable<HttpEvent<any>> {
        let url = this._serviceUri + this._resource + "/" + id;
        return this._http.put<HttpEvent<any>>(url, resource, this.requestOptions);
    }

    /**
     * Delete entity
     * @param id id of resource to delete
     */
    public delete(id: number): Observable<HttpEvent<any>> {
        let url = this._serviceUri + this._resource + "/" + id;
        return this._http.delete<HttpEvent<any>>(url, this.requestOptions);
    }
}