import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Employee } from '../../common/lib/Employee';
@Component({
  selector: 'entity',
  standalone: true,
  imports: [],
  templateUrl: './entity.component.html',
  styleUrl: './entity.component.scss'
})
export class EntityComponent {
  @Input()
  entity!: Employee;



}
