import { Pipe, PipeTransform } from "@angular/core";
import { Employee } from "../lib/Employee";


@Pipe({
    standalone: true,
    name: 'filterObject',
})
export class FilterObjectPipe implements PipeTransform {

    transform(obj: Employee, search: string): Employee | null {

        //convert object to json string and search it all
        let _search: string = search.toLocaleLowerCase();
        let _obj: string = JSON.stringify(obj).toLowerCase();

        if (_obj.includes(_search))
            return obj;
        else
            return null;

    }

}