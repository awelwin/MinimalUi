import { Employee } from '../common/lib/Employee'
import { Component, Input } from '@angular/core';

@Component({
  selector: 'entity',
  standalone: true,
  imports: [],
  templateUrl: './entity.component.html',
  styleUrl: './entity.component.scss'
})
export class EntityComponent {
  @Input()
  employee!: Employee;


}
