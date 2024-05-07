import { Component, Input } from '@angular/core';
import { Employee } from '../../common/lib/Employee'
@Component({
  selector: 'entity-summary',
  standalone: true,
  imports: [],
  templateUrl: './entity-summary.component.html',
  styleUrl: './entity-summary.component.scss'
})
export class EntitySummaryComponent {
  @Input() data: Employee = <Employee>{};

  constructor() { }
}
