import { ComponentRef, DestroyRef, EnvironmentInjector, Inject, Injectable, Injector, OnDestroy, Type, createComponent } from "@angular/core";
import { ApplicationRef } from "@angular/core";
import { ModalWrapperComponent } from "./modal-wrapper.component";
import { ModalChildComponent } from "./modal-child.component";
import { ErrorService } from "../../services/ErrorService";
import { Subject } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

export class ModalService<T> {

    protected readonly GLOBAL_MODAL_ELEMENT_ID: string = "GLOBAL_MODAL_ELEMENT_ID";
    protected readonly GLOBAL_MODAL_BODY_ELEMENT_ID = "GLOBAL_MODAL_BODY_ELEMENT_ID";
    private _contentInjector: Injector = null!;
    private _environmentInjector: EnvironmentInjector = null!;
    private _applicationRef: ApplicationRef = null!;
    private _document: Document = null!;

    constructor(
        environmentInjector: EnvironmentInjector,
        contentInjector: Injector,
        applicationRef: ApplicationRef,
        document: Document,
        private errorService: ErrorService,
        private destroyRef: DestroyRef) {
        this._environmentInjector = environmentInjector;
        this._contentInjector = contentInjector;
        this._applicationRef = applicationRef;
        this._document = document;
    }

    protected _modalWrapperComponent: ComponentRef<any> = null!;
    private _modalInstance!: any;
    public modalAcepted: Subject<T | null> = new Subject();
    public modalCancelled: Subject<T | null> = new Subject();

    /**
     * Open modal dialog to promp for user interaction
     * - where T is 'any' and specifies return payload type
     * - where component must extend ModalChildComponent  
    */
    open(comp: ModalChildComponent<T>, data: T) {

        //create content
        const childComponent = createComponent<ModalChildComponent<T>>(
            <any>comp,
            {
                environmentInjector: this._environmentInjector,
                elementInjector: this._contentInjector
            }
        );

        //subscribe to known child events
        childComponent.instance.cancelEvent
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(
                {
                    next: () => this.cancelMe(),
                    error: (err) => this.errorService.show(err)
                });
        childComponent.instance.acceptEvent.asObservable()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(
                {
                    next: (data: T) => this.acceptMe(data),
                    error: (err) => this.errorService.show(err)
                });
        //pass data to child
        childComponent.setInput("data", data);

        //create modal
        this._modalWrapperComponent = createComponent(
            ModalWrapperComponent,
            {
                environmentInjector: this._environmentInjector,
                elementInjector: this._contentInjector
            });

        //append modal to application
        this._applicationRef.attachView(this._modalWrapperComponent.hostView);
        this._applicationRef.attachView(childComponent.hostView);
        this._document.body.appendChild(this._modalWrapperComponent.location.nativeElement);

        //inject content inside modal
        var modBody = this._document.getElementById(this.GLOBAL_MODAL_BODY_ELEMENT_ID);
        modBody!.appendChild(childComponent.location.nativeElement);

        //execute bootstrap modal
        var modalElement = this._document.getElementById(this.GLOBAL_MODAL_ELEMENT_ID);
        this._modalInstance = new bootstrap.Modal(
            modalElement,
            { backdrop: true, keyboard: true, focus: true });
        modalElement!.addEventListener('hidden.bs.modal', event => this.cancelMe());
        this._modalInstance.show();
    }

    protected cancelMe() {
        this._modalInstance.dispose();
        this._modalWrapperComponent.destroy();
        this.modalCancelled.next(null!);

    }
    protected acceptMe(data: T) {
        this._modalInstance.dispose();
        this._modalWrapperComponent.destroy();
        this.modalAcepted.next(data);
    }
}
