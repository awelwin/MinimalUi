import { ActionType as ActionType } from "../../lib/ActionType";
import { Action } from "../../lib/Action";
import { IEntity } from "../../lib/IEntity";
/**
 * Encapsulate a generic modal action. i.e. create and entity or simply confirm yes/no
 */
export class ModalAction<T extends IEntity> extends Action<T> {

    public title: string = "";
    public message: string = "";
}


