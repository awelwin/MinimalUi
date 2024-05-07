import { Employee } from '../../common/lib/Employee';
import { TaxFile } from '../../common/lib/TaxFile';
import { TaxFileRecord } from '../../common/lib/TaxFileRecord';
import { Component } from '@angular/core';
import { EntitySummaryComponent } from '../entity-summary/entity-summary.component';
import { CommonModule } from '@angular/common';
import { TableFilter } from '../../pipes/TableFilterPipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'aggregate',
  standalone: true,
  imports: [EntitySummaryComponent, CommonModule, TableFilter, FormsModule],
  templateUrl: './aggregate.component.html',
  styleUrl: './aggregate.component.scss'
})
export class AggregateComponent {

  public _entities: Employee[] = [];
  public _search: string = "";
  contructor() { }

  /**
 * Angular component OnInit 
 */
  ngOnInit() {

    //SAMPLE MOCK DATA
    this._entities = <Employee[]>[<Employee>{
      Id: 2945,
      Firstname: "Alex",
      Lastname: "Elwin",
      Age: 34,
      TaxFile: <TaxFile>{
        Id: 4652,
        Alias: "Alex Tax File",
        TaxFileRecords: <TaxFileRecord[]>
          [
            <TaxFileRecord>
            {
              Id: 42,
              TaxFileId: 4652,
              FinancialYear: 1999,
              AmountPaid: 335,
              AmountClaimed: 465
            }
          ]
      }
    },

    <Employee>{
      Id: 2946,
      Firstname: "Christopher",
      Lastname: "Mclouwski",
      Age: 34,
      TaxFile: <TaxFile>{
        Id: 4653,
        Alias: "Alex Tax File",
        TaxFileRecords: <TaxFileRecord[]>
          [
            <TaxFileRecord>
            {
              Id: 44,
              TaxFileId: 4653,
              FinancialYear: 1455,
              AmountPaid: 3322,
              AmountClaimed: 0
            }
          ]
      }
    }]
  }
}
