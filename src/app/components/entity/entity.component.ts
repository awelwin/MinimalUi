import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Employee } from '../../common/lib/Employee';
import { CommonModule, DatePipe } from '@angular/common';

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



}
