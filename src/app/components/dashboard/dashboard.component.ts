import { Component, OnInit } from '@angular/core';
import { Employee } from '../../lib/Employee';
import { CommonModule, NgFor, NgIf, } from '@angular/common';
import { ErrorService } from '../../services/ErrorService';
import { FormsModule } from '@angular/forms';
import { FilterEmployeeCollectionPipe } from '../../pipes/FilterEmployeeCollectionPipe';
import { AggregateWrapperComponent } from '../aggregate-wrapper/aggregate-wrapper.component';
import { EmployeeFullnlamePipe } from '../../pipes/EmployeeFullnamePipe';
import { Observable, Subject, catchError, combineLatest, debounceTime, map, of, startWith, switchMap, tap } from 'rxjs';
import { Action } from '../../lib/Action';
import { ActionType } from '../../lib/ActionType';
import { RepositoryServiceFactory } from '../../services/RepositoryServiceFactory';
import { RepositoryService } from '../../services/RepositoryService';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, FormsModule, FilterEmployeeCollectionPipe, AggregateWrapperComponent, EmployeeFullnlamePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  _repoService!: RepositoryService<Employee>;
  _delete$!: Observable<number>;
  _deleteClicked$!: Subject<Employee>;
  _filter = "";
  _filter$ = new Subject<string | undefined | null>();
  _list$!: Observable<Employee[]>;
  _listFiltered$!: Observable<Employee[]>;
  _listFilteredWithActions$!: Observable<Employee[]>;

  /** 
   * CONSTRUCTOR */
  constructor(
    private errorService: ErrorService,
    private repoServiceFactory: RepositoryServiceFactory
  ) {

    this._repoService = repoServiceFactory.getInstance<Employee>(Employee)

    //--REACTIVE Declarative setup --

    //user actions
    this._deleteClicked$ = new Subject<Employee>;
    this._delete$ = this._deleteClicked$
      .pipe(map(employee => employee.id)); //just id property needed

    //list
    this._list$ = this._repoService.get()
      .pipe(catchError(err => { this.errorService.show(err); return of([]); })
      );

    //list Filtered
    this._listFiltered$ = combineLatest(
      [this._filter$?.pipe(startWith(''), debounceTime(900)), this._list$])
      .pipe(map(
        ([filter, list]) => this.filterEmployees(list, filter!)));

    //list Filtered + Actions
    this._listFilteredWithActions$ = combineLatest([this._delete$.pipe(startWith(-1)), this._listFiltered$])
      .pipe(
        switchMap(([del, list]) => {

          //delete locally
          if (del != -1) {
            let index = list.findIndex(x => x.id === del)
            if (index > -1)
              list.splice(index, 1)
          }
          return of(list);
        }));
  }

  /**
   * ngOnInit*/
  ngOnInit() { }

  /**
   * actionTaken
   * @param action  
   */
  actionTaken(action: Action<Employee>) {

    if (action.actionType == ActionType.Delete) {
      this._deleteClicked$.next(action.payload);
    }
  }

  filterChange() {
    this._filter$?.next(this._filter);
  }

  /**
   * filter
   * @param list list containing searchable objects 
   * @param value string value to compare to object property vlaues
   * @returns [] of filtered results
   */
  filterEmployees(list: any[] | null, value: string): any[] {

    //validate params
    if (value == "")
      return list!;

    if (list == null)
      return [];

    //search using json string
    let _results: Employee[] = [];
    let _value = ""
    _results = list.filter(
      (e) => JSON.stringify({ id: e.id, firstname: e.firstname, lastname: e.lastname })
        .toLowerCase()
        .includes(value.toLowerCase()));

    return _results;
  }
}



