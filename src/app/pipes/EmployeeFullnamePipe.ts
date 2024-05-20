import { Pipe, PipeTransform } from "@angular/core";
import { Employee } from "../lib/Employee";

@Pipe({
    name: 'employeeFullname',
    pure: true,
    standalone: true
})
export class EmployeeFullnlamePipe implements PipeTransform {
    transform(value: Employee,) {
        return `${value.lastname}, ${value.firstname}`;
    }
}