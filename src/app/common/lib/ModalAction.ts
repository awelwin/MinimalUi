import { ModalActionType } from "./ModalActionType";

/**
 * Encapsulate modal interaction for form based user input
 */
export class ModalAction<T> {

    constructor(
        public payload: T,
        public type: ModalActionType) { }

}
/*
Encapsulate Modal interaction for yes/no confirmation type
 */
export class YesNoModalAction extends ModalAction<number> {
    constructor(
        public message: string = "",
        public title: string = "",
        type: ModalActionType,
        payload: number
    ) {
        super(payload, type);
    }
}

