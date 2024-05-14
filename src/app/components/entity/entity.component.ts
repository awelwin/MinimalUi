import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Employee } from '../../common/lib/Employee';
import { CommonModule, DatePipe } from '@angular/common';

import { ErrorService } from '../../common/lib/ErrorService';
import { AggregateService } from '../aggregate/aggregate-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'entity',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './entity.component.html',
  styleUrl: './entity.component.scss'
})
export class EntityComponent {
  @Input()
  data!: Employee;

  constructor(private modalService: NgbModal,
    private aggregateService: AggregateService<Employee>,
    private errorService: ErrorService) {
    this.aggregateService.initialize("Employee");
  }




}
