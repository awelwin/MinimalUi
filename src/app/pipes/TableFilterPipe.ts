import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'TableFilter',
  standalone: true
})
/**
 * Filter tables or collection of objects.
 *  Search any property for result
 */
export class TableFilter implements PipeTransform {

  transform(list: any[], value: string) {

    return value ?
      list.filter((item) =>
        JSON.stringify(item).toLowerCase().includes(value.toLowerCase())
      ) :
      list;
  }
}
