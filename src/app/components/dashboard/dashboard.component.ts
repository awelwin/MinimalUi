import { Component, DestroyRef, OnInit } from '@angular/core';
import { Employee } from '../../lib/Employee';
import { CommonModule, NgFor, NgIf, } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ErrorService } from '../../services/ErrorService';
import { FormsModule } from '@angular/forms';
import { FilterEmployeeCollectionPipe } from '../../pipes/FilterEmployeeCollectionPipe';
import { AggregateWrapperComponent } from '../aggregate-wrapper/aggregate-wrapper.component';
import { EmployeeFullnlamePipe } from '../../pipes/EmployeeFullnamePipe';
import { EmployeeService } from '../aggregate/employee-service';
import { Subject, debounceTime } from 'rxjs';
import { Action } from '../../lib/Action';
import { ActionType } from '../../lib/ActionType';


@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, FormsModule, FilterEmployeeCollectionPipe, AggregateWrapperComponent, EmployeeFullnlamePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  employees: Employee[] = [];
  _filterSubject: Subject<string> | null = null;
  _filter: string = "";


  constructor(
    private employeeService: EmployeeService,
    private destroyRef: DestroyRef,
    private errorService: ErrorService
  ) { }

  ngOnInit() {

    //call api
    this.employeeService.list()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => this.employees = data,
        error: (err) => this.errorService.show(err)
      });


    //subscribe to filter input
    this._filterSubject = new Subject<string>();
    this._filterSubject
      .pipe(debounceTime(300))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (val) => console.log(val),
        error: (err) => this.errorService.show(err)
      });
  }

  actionTaken(action: Action<Employee>) {

    //delete from local array
    if (action.actionType == ActionType.Delete) {
      var index = this.employees.findIndex(x => x.id == action.payload.id);
      if (index > -1) {
        this.employees.splice(index, 1);
      }
    }
  }

  filterDebounce(event: any) {
    this._filterSubject?.next(this._filter);
  }
}



