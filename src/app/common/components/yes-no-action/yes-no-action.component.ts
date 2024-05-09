import { Component, Input } from '@angular/core';
import { Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalActionType } from '../../lib/ModalActionType';
import { YesNoModalAction } from '../../lib/ModalAction';
@Component({
  selector: 'confirm-action',
  standalone: true,
  imports: [],
  templateUrl: './yes-no-action.component.html',
  styleUrl: './yes-no-action.component.scss'
})
export class ConfirmActionComponent<T> {
  buttonClass: string = "btn-Dark";
  borderClass: string = "border-primary"
  @Input()
  yesNoModalAction!: YesNoModalAction;

  constructor(private activeModal: NgbActiveModal) { }

  dismissModal() {
    this.activeModal.dismiss();
  }
  closeModal(id?: number) {
    this.activeModal.close(id);
  }

  /*
   * INIT
   */
  ngOnInit() {

    //set style based on requested action type
    if (this.yesNoModalAction != null) {

      switch (this.yesNoModalAction.type) {
        case ModalActionType.Delete:
          this.buttonClass = "btn btn-danger";
          this.borderClass = "border-danger"
          break;
        default:
          this.buttonClass = "btn btn-secondary"
      }
    }
  }
}
