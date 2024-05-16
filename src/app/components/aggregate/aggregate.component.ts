import { Employee } from '../../lib/Employee';
import { Component, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFilter } from '../../pipes/TableFilterPipe';
import { FormsModule } from '@angular/forms';
import { AggregateService } from './aggregate-service';
import { ErrorService } from '../../services/ErrorService';
import { EntityComponent } from '../entity/entity.component';
import { ModalActionType } from '../modal/ModalActionType';
import { YesNoModalAction } from '../modal/ModalAction';
import { Subject, debounceTime } from 'rxjs';
import { QueryService } from './QueryService';
import { EmployeeSearchQueryResult } from './EmployeeSearchQueryResult';
import { ModalService } from '../modal/ModalService';
import { YesNoActionComponent } from '../modal/yes-no-action/yes-no-action.component';
import { ModalServiceFactory } from '../modal/ModalServiceFactory';

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
  public _searchNoResult: boolean = false;
  _currentEntity!: Employee;

  constructor(
    private aggregateService: AggregateService<Employee>,
    private errorService: ErrorService,
    private queryService: QueryService,
    private modalServiceFactory: ModalServiceFactory) {
    this.aggregateService.initialize("Employee");
  }

  /**
 * Angular component OnInit 
 */
  ngOnInit() {

    //React to search input keystrokes
    this.searchSubject
      .pipe(debounceTime(700))
      .subscribe({
        next: () => {
          if (this._search == "") {
            this._searchResults = [];
            this._searchNoResult = false;
          }
          else {
            this.queryService.searchEmployee(this._search)
              .subscribe({
                next: (result) => {
                  this._searchResults = result; //save results                 
                  this._searchNoResult = this._searchResults.length < 1;
                },
                error: () => this.errorService.show()
              });
          }
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
          this._searchNoResult = false;
        },
        error: () => this.errorService.show()
      });
  }


  /* confirm delete
  * @param id entity id
  */
  deleteConfirm(id: number) {

    //Modal Content
    let content: YesNoModalAction = new YesNoModalAction(
      "Note: This action may not be reversablex",
      "Confirm Delete",
      ModalActionType.Delete,
      id
    );

    //Modal
    let modalInstance: ModalService<YesNoModalAction> = this.modalServiceFactory.create<YesNoModalAction>();
    modalInstance.modalAcepted.subscribe({
      next: (data) => this.delete(data!.payload),
      error: () => this.errorService.show()
    });
    modalInstance.open(<any>YesNoActionComponent, content);

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