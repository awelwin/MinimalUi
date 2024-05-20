import { Component, Directive, EventEmitter, Input, Output } from "@angular/core";
import { ModalAction } from "./ModalAction";
import { identity } from "rxjs";
import { IEntity } from "../../lib/IEntity";

/**
 *  components placed inside a moda */
@Component({
    selector: "abstract",
    standalone: true,
    template: ""
})
export abstract class ModalChildComponent<T extends IEntity> {

    constructor() { }

    @Input()
    action: ModalAction<T> | null = null;

    @Output()
    cancelEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output()
    acceptEvent = new EventEmitter<ModalAction<T>>;

    ngOnInit() { }

    abstract accept(): void;
    abstract cancel(): void;

}