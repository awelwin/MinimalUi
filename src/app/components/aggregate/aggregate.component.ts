import { Employee } from '../../common/lib/Employee';
import { TaxFile } from '../../common/lib/TaxFile';
import { TaxFileRecord } from '../../common/lib/TaxFileRecord';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFilter } from '../../pipes/TableFilterPipe';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmActionComponent } from '../../common/components/yes-no-action/yes-no-action.component';
import { ModalActionType } from '../../common/lib/ModalActionType';
import { YesNoModalAction } from '../../common/lib/ModalAction';
import { AggregateService } from './aggregate-service';
import { ErrorService } from '../../common/lib/ErrorService';

@Component({
  selector: 'aggregate',
  standalone: true,
  imports: [CommonModule, TableFilter, FormsModule],
  templateUrl: './aggregate.component.html',
  styleUrl: './aggregate.component.scss'
})
export class AggregateComponent {

  public _entities: any[] = [];
  public _search: string = "";
  _selectedEntityId: number = 0;

  constructor(private modalService: NgbModal,
    private aggregateService: AggregateService<Employee>,
    private errorService: ErrorService) {
    this.aggregateService.initialize("Employee");
  }

  /**
   * confirm delete
   * @param id entity id
   */
  deleteConfirm(id: number) {

    //open modal 
    const modalRef = this.modalService.open(ConfirmActionComponent, { size: "sm", centered: true });

    //configure modal
    let action: YesNoModalAction = new YesNoModalAction(
      "Note: This action may not be reversable",
      "Confirm Delete",
      ModalActionType.Delete,
      id
    );
    modalRef.componentInstance.yesNoModalAction = action;

    //listen results
    modalRef.closed.subscribe(result => {
      if (result != null) {
        this.delete(result)
      }
    });
  }

  /**
   * delete row
   */
  delete(id: number) {
    this.aggregateService.delete(id)
      .subscribe(
        {
          next: (res) => { this._entities = this._entities.filter(i => i.id !== id); },
          error: (err) => { this.errorService.show(); }
        }
      );
  }
  /**
   * 
   * @param id User clicks on an aggregate entity row
   */
  rowClicked(id: number) {
    this._selectedEntityId = id;
  }


  /**
 * Angular component OnInit 
 */
  ngOnInit() {

    //get aggregate from service
    this.aggregateService.initialize("Employee");
    this.aggregateService.list<Employee>()
      .subscribe({
        next: (data) => this._entities = data,
        error: (err) => this.errorService.show()
      });
  }
}