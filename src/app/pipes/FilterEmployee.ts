import { Pipe, PipeTransform } from "@angular/core";
import { Employee } from "../lib/Employee";


@Pipe({
    standalone: true,
    name: 'filterEmployee',
})
export class FilterEmployeePipe implements PipeTransform {

    transform(obj: Employee, search: string): Employee | null {

        // convert object to string of only key fields to search
        let _search: string = search.toLocaleLowerCase();
        let _obj: string = obj.firstname + obj.lastname + obj.id

        if (_obj.includes(_search))
            return obj;
        else
            return null;

    }

}