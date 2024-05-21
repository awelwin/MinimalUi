import { Employee } from '../../lib/Employee';
import { Component, DestroyRef, OnDestroy, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ErrorService } from '../../services/ErrorService';
import { EntityComponent } from '../entity/entity.component';
import { Subject, debounceTime } from 'rxjs';
import { QueryService } from '../../services/QueryService';
import { EmployeeSearchQueryResult } from '../../lib/EmployeeSearchQueryResult';
import { YesNoActionComponent } from '../modal/yes-no-action/yes-no-action.component';
import { ModalServiceFactory } from '../modal/ModalServiceFactory';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ModalAction } from '../modal/ModalAction';
import { ActionType } from '../../lib/ActionType';
import { RepositoryServiceFactory } from '../../services/RepositoryServiceFactory';
import { RepositoryService } from '../../services/RepositoryService';

@Component({
  selector: 'aggregate',
  standalone: true,
  imports: [CommonModule, FormsModule, EntityComponent],
  templateUrl: './aggregate.component.html',
  styleUrl: './aggregate.component.scss'
})
export class AggregateComponent {

  private _repoService!: RepositoryService<Employee>;
  public _search: string = "";
  public _searchResults: EmployeeSearchQueryResult[] = [];
  public searchSubject: Subject<any> = new Subject();
  public _searchNoResult: boolean = false;
  _currentEntity!: Employee;
  _DEVONLYEMPLOYEE: Employee = <Employee>({ firstname: "Johnny", lastname: "TurnCoat", age: 45, taxFile: { alias: "December Taxfile", employeeId: 2, taxFileRecords: [{ financialYear: 2001, amountPaid: 300, amountClaimed: 289, taxFileId: 2, id: 4, created: new Date(), updated: new Date() }, { financialYear: 2002, amountPaid: 365, amountClaimed: 444, taxFileId: 2, id: 5, created: new Date(), updated: new Date() }, { financialYear: 2003, amountPaid: 4655, amountClaimed: 34, taxFileId: 2, id: 6, created: new Date(), updated: new Date() }], id: 2, created: new Date(), updated: new Date() }, id: 2, updated: new Date() })
  constructor(
    private repoServiceFactory: RepositoryServiceFactory,
    private errorService: ErrorService,
    private queryService: QueryService,
    private modalServiceFactory: ModalServiceFactory,
    private destroyRef: DestroyRef) {
    this._repoService = repoServiceFactory.getInstance<Employee>(Employee);
  }

  /**
 * Angular component OnInit 
 */
  ngOnInit() {

    //React to search input keystrokes
    this.searchSubject
      .pipe(debounceTime(700))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          if (this._search == "") {
            this._searchResults = [];
            this._searchNoResult = false;
          }
          else {
            this.queryService.searchEmployee(this._search)
              .pipe(takeUntilDestroyed(this.destroyRef))
              .subscribe({
                next: (result) => {
                  this._searchResults = result; //save results                 
                  this._searchNoResult = this._searchResults.length < 1;
                },
                error: (err) => this.errorService.show(err)
              });
          }
        },
        error: (err) => this.errorService.show(err)
      });

  }
  searchDebounce(event: any) {
    this.searchSubject.next(this._search);
  }

  /**
   * sets current entity based on search results clicked
   */
  searchResultChosen(id: number) {
    this._repoService.getWithId(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result) => {
          this._currentEntity = result;
          this._searchResults = [];
          this._search = "";
          this._searchNoResult = false;
        },
        error: (err) => this.errorService.show(err)
      });
  }


  /* confirm delete
  * @param id entity id
  */
  deleteConfirm(emp: Employee) {

    //Modal Content
    let action = <ModalAction<Employee>>({
      title: "Confirm Delete",
      message: "Note: This action may not be reversablex",
      actionType: ActionType.Delete,
      payload: emp
    });

    //Modal
    let modalInstance = this.modalServiceFactory.getInstance<Employee>();
    modalInstance.modalAcepted
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (modalAction) => this.delete(modalAction?.payload!),
        error: (err) => this.errorService.show(err)
      });
    modalInstance.open(<any>YesNoActionComponent, action);

  }
  /**
   * delete row
   */
  delete(emp: Employee) {
    this._repoService.delete(emp.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => this._currentEntity = null!,
        error: (err) => this.errorService.show(err)
      }
      );
  }
}