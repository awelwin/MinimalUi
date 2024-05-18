import { Employee } from '../../lib/Employee';
import { Component, DestroyRef, OnDestroy, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AggregateService } from './aggregate-service';
import { ErrorService } from '../../services/ErrorService';
import { EntityComponent } from '../entity/entity.component';
import { ModalActionType } from '../modal/ModalActionType';
import { YesNoModalAction } from '../modal/ModalAction';
import { Subject, debounceTime } from 'rxjs';
import { QueryService } from '../../services/QueryService';
import { EmployeeSearchQueryResult } from '../../lib/EmployeeSearchQueryResult';
import { ModalService } from '../modal/ModalService';
import { YesNoActionComponent } from '../modal/yes-no-action/yes-no-action.component';
import { ModalServiceFactory } from '../modal/ModalServiceFactory';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'aggregate',
  standalone: true,
  imports: [CommonModule, FormsModule, EntityComponent],
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
    private modalServiceFactory: ModalServiceFactory,
    private destroyRef: DestroyRef) {
    this.aggregateService.initialize("Employee");

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
    this.aggregateService.getWithId<Employee>(id)
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
  deleteConfirm(id: number) {

    //Modal Content
    let content: YesNoModalAction = new YesNoModalAction(
      "Note: This action may not be reversablex",
      "Confirm Delete",
      ModalActionType.Delete,
      id
    );

    //Modal
    let modalInstance: ModalService<YesNoModalAction> = this.modalServiceFactory.getInstance<YesNoModalAction>();
    modalInstance.modalAcepted
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => this.delete(data!.payload),
        error: (err) => this.errorService.show(err)
      });
    modalInstance.open(<any>YesNoActionComponent, content);

  }
  /**
   * delete row
   */
  delete(id: number) {
    this.aggregateService.delete(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => this._currentEntity = null!,
        error: (err) => this.errorService.show(err)
      }
      );
  }
}