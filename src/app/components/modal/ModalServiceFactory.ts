import { ApplicationRef, EnvironmentInjector, Injector } from "@angular/core";
import { ErrorService } from "../../services/ErrorService";
import { ModalService } from "./ModalService";

export class ModalServiceFactory {

    constructor(private environmentInjector: EnvironmentInjector,
        private contentInjector: Injector,
        private applicationRef: ApplicationRef,
        private document: Document,
        private errorService: ErrorService) {
    }

    public create<T>(): ModalService<T> {
        return new ModalService<T>(
            this.environmentInjector,
            this.contentInjector,
            this.applicationRef,
            this.document,
            this.errorService);
    }
}