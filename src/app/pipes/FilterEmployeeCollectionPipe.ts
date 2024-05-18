import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../lib/Employee';

@Pipe({
    name: 'filterEmployeeCollection',
    standalone: true
})
/**
 * Filter collection of employee objects.
 *  Search only 'id' 'firstname' 'lastname' properties
 */
export class FilterEmployeeCollectionPipe implements PipeTransform {

    transform(list: any[] | null, value: string): any[] {

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
