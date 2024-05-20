import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Employee } from '../../lib/Employee';
import { CommonModule, DatePipe } from '@angular/common';

import { ErrorService } from '../../services/ErrorService';
import { EmployeeService } from '../aggregate/employee-service';

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

  constructor(
    private employeeService: EmployeeService,
    private errorService: ErrorService) { }
}
