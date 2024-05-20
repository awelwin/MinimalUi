import { Component, DestroyRef, EventEmitter, Input, Output } from '@angular/core';
import { ErrorService } from '../../services/ErrorService';
import { ModalAction } from '../modal/ModalAction';
import { ModalService } from '../modal/ModalService';
import { ModalServiceFactory } from '../modal/ModalServiceFactory';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { YesNoActionComponent } from '../modal/yes-no-action/yes-no-action.component';
import { EmployeeService } from '../aggregate/employee-service';
import { IEntity } from '../../lib/IEntity';
import { Action } from '../../lib/Action';
import { ActionType } from '../../lib/ActionType';
@Component({
  selector: 'aggregate-wrapper',
  standalone: true,
  imports: [],
  templateUrl: './aggregate-wrapper.component.html',
  styleUrl: './aggregate-wrapper.component.scss'
})
export class AggregateWrapperComponent<T extends IEntity> {


  @Input('title',)
  title: string = "";

  @Input('entity')
  entity!: IEntity;

  @Output()
  actionTaken: EventEmitter<Action<T>> = new EventEmitter<Action<T>>();

  constructor(
    private errorService: ErrorService,
    private modalServiceFactory: ModalServiceFactory,
    private destroyRef: DestroyRef,
    private employeeService: EmployeeService) { }

  protected requestDelete() {

    let action: ModalAction<T> = <ModalAction<T>>({
      payload: this.entity,
      actionType: ActionType.Delete,
      title: "Confirm Delete",
      message: "Note: This action may not be reversable"
    });

    //Modal
    let modalInstance: ModalService<T> = this.modalServiceFactory.getInstance<T>();
    modalInstance.modalAcepted
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (modalAction) => this.delete(modalAction!),
        error: (err) => this.errorService.show(err)
      });
    modalInstance.open(<any>YesNoActionComponent, action);
  }

  /*
    * delete entity */
  delete(action: ModalAction<T>) {

    this.employeeService.delete(action.payload.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => { this.actionTaken.emit(<Action<T>>({ payload: action.payload, actionType: action.actionType })) },
        error: (err) => this.errorService.show(err)
      }
      );
  }
}
