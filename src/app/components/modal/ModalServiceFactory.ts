import { ApplicationRef, DestroyRef, EnvironmentInjector, Injector } from "@angular/core";
import { ErrorService } from "../../services/ErrorService";
import { ModalService } from "./ModalService";
import { IEntity } from "../../lib/IEntity";

export class ModalServiceFactory {

    protected _instance: ModalService<any> | null = null;

    constructor(private environmentInjector: EnvironmentInjector,
        private contentInjector: Injector,
        private applicationRef: ApplicationRef,
        private document: Document,
        private errorService: ErrorService,
        private destroyRef: DestroyRef
    ) {
    }

    /**
     * Not a true Singleton implementation
     * Typescript does not allow generic type comparrison i.e.
     * we cannot hold a singleton for each variation of T
    */
    public getInstance<T extends IEntity>(): ModalService<T> {

        let service = new ModalService<T>(
            this.environmentInjector,
            this.contentInjector,
            this.applicationRef,
            this.document,
            this.errorService,
            this.destroyRef

        );
        this._instance = service; // killing existing
        return service;
    }
}