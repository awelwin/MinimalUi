import { ActionType } from "./ActionType";
import { IEntity } from "./IEntity";

export class Action<T extends IEntity> {

    constructor(public payload: T, public actionType: ActionType) { }

}

