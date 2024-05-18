import { Component, DestroyRef, OnInit } from '@angular/core';
import { RestService } from '../../services/RestService';
import { Employee } from '../../lib/Employee';
import { Observable, Subject, debounceTime } from 'rxjs';
import { CommonModule, NgFor, NgIf, } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ErrorService } from '../../services/ErrorService';
import { FormsModule } from '@angular/forms';
import { FilterEmployeeCollectionPipe } from '../../pipes/FilterEmployeeCollectionPipe';


@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, FormsModule, FilterEmployeeCollectionPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  employees$!: Observable<Employee[]>
  _filterSubject: Subject<string> | null = null;
  _filter: string = "";


  constructor(
    private restService: RestService,
    private destroyRef: DestroyRef,
    private errorService: ErrorService) { }

  ngOnInit() {

    //call api
    this.employees$ = this.restService.get<Employee>("employee")

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

  filterDebounce(event: any) {
    this._filterSubject?.next(this._filter);
  }
}

