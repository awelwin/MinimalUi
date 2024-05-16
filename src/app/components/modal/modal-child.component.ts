import { Component, Directive, EventEmitter, Input, Output } from "@angular/core";

/**
 *  components placed inside a moda */
@Component({
    selector: "abstract",
    standalone: true,
    template: ""
})
export abstract class ModalChildComponent<T> {

    constructor() { }

    @Input()
    data: T | null = null;

    @Output()
    cancelEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output()
    acceptEvent: EventEmitter<T> = new EventEmitter<T>();

    ngOnInit() {
    }

    abstract accept(): void;
    abstract cancel(): void;
}