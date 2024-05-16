import { Component, Input } from '@angular/core';
import { ModalActionType } from '../ModalActionType';
import { YesNoModalAction } from '../ModalAction';
import { ModalChildComponent } from '../modal-child.component';

@Component({
  selector: 'yes-no',
  standalone: true,
  imports: [],
  templateUrl: './yes-no-action.component.html',
  styleUrl: './yes-no-action.component.scss'
})
export class YesNoActionComponent extends ModalChildComponent<YesNoModalAction> {

  buttonClass: string = "btn-Dark";
  borderClass: string = "border-primary"

  constructor() { super(); }

  override cancel() {
    this.cancelEvent.emit(true);
  }

  override accept() {
    this.acceptEvent.emit(this.data!);
  }

  /*
   INIT */
  override ngOnInit() {

    //set style based on requested action type
    switch (this.data?.type) {
      case ModalActionType.Delete:
        this.buttonClass = "btn btn-danger";
        this.borderClass = "border-danger"
        break;
      default:
        this.buttonClass = "btn btn-secondary"
    }
  }
}
