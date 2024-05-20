import { Component } from '@angular/core';
import { ModalChildComponent } from '../modal-child.component';
import { ActionType } from '../../../lib/ActionType';
import { IEntity } from '../../../lib/IEntity';

@Component({
  selector: 'yes-no',
  standalone: true,
  imports: [],
  templateUrl: './yes-no-action.component.html',
  styleUrl: './yes-no-action.component.scss'
})
export class YesNoActionComponent<T extends IEntity> extends ModalChildComponent<T> {

  buttonClass: string = "btn-Dark";
  borderClass: string = "border-primary"

  constructor() { super(); }

  override cancel() {
    this.cancelEvent.emit(true);
  }

  override accept() {
    this.acceptEvent.emit(this.action!);
  }

  /*
   INIT */
  override ngOnInit() {

    //set style based on requested action type
    switch (this.action?.actionType) {
      case ActionType.Delete:
        this.buttonClass = "btn btn-danger";
        this.borderClass = "border-danger"
        break;
      default:
        this.buttonClass = "btn btn-secondary"

    }
  }
}
