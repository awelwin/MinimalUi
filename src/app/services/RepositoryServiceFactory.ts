import { HttpClient } from "@angular/common/http";
import { RepositoryService } from "./RepositoryService";
import { IEntity } from "../lib/IEntity";

/**
 NOTE: Factory created due to limitations with typescript generics.
 * Cannot infer type of T at design time to link [class -> rest resource]
 * This factory resolves this by instantiating class and extracting 'IEntity.resource' property
 */
export class RepositoryServiceFactory {
    private singletonInstances: RepositoryService<any>[] = [];

    constructor(private http: HttpClient, private serviceUri: string) { }

    public getInstance<T extends IEntity>(res: new () => T) {

        //extract resource name from parameter specifying classname
        let r = new res();
        let resourceName = r.resourceName;

        //one service instance for one distince rest resource
        let existing = this.singletonInstances.find(x => x._resource === resourceName);
        if (existing != null) {
            return existing;
        }
        else {
            let length = this.singletonInstances.push(new RepositoryService<T>(this.http, this.serviceUri, resourceName));
            return this.singletonInstances[length - 1];
        }

    }
}