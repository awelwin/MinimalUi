import { Employee } from '../../common/lib/Employee';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFilter } from '../../pipes/TableFilterPipe';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AggregateService } from './aggregate-service';
import { ErrorService } from '../../common/lib/ErrorService';
import { EntityComponent } from '../entity/entity.component';
import { ModalActionType } from '../../common/lib/ModalActionType';
import { YesNoModalAction } from '../../common/lib/ModalAction';
import { ConfirmActionComponent } from '../../common/components/yes-no-action/yes-no-action.component';
import { Subject, Observable, fromEvent, debounceTime } from 'rxjs';
import { QueryService } from './QueryService';
import { EmployeeSearchQueryResult } from './EmployeeSearchQueryResult';

@Component({
  selector: 'aggregate',
  standalone: true,
  imports: [CommonModule, TableFilter, FormsModule, EntityComponent],
  templateUrl: './aggregate.component.html',
  styleUrl: './aggregate.component.scss'
})
export class AggregateComponent {

  public _search: string = "";
  public _searchResults: EmployeeSearchQueryResult[] = [];
  public searchSubject: Subject<any> = new Subject();

  _currentEntity!: Employee;

  constructor(private modalService: NgbModal,
    private aggregateService: AggregateService<Employee>,
    private errorService: ErrorService,
    private queryService: QueryService) {
    this.aggregateService.initialize("Employee");
  }

  /**
 * Angular component OnInit 
 */
  ngOnInit() {

    //React to search input keystrokes
    this.searchSubject
      .pipe(debounceTime(1000))
      .subscribe({
        next: () => {
          if (this._search == "")
            this._searchResults = [];
          else
            this.queryService.searchEmployee(this._search)
              .subscribe({
                next: (result) => { this._searchResults = result; },
                error: () => this.errorService.show()
              });
        },
        error: () => this.errorService.show()
      });

  }
  searchDebounce(event: any) {
    this.searchSubject.next(this._search);
  }

  /**
   * sets current entity based on search results clicked
   */
  searchResultChosen(id: number) {
    this.aggregateService.getWithId<Employee>(id)
      .subscribe({
        next: (result) => {
          this._currentEntity = result;
          this._searchResults = [];
          this._search = "";
        },
        error: () => this.errorService.show()
      });
  }


  /* confirm delete
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
      .subscribe({
        next: (res) => this._currentEntity = null!,
        error: (err) => this.errorService.show()
      }
      );
  }
}