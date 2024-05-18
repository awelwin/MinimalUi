import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCollection',
  standalone: true
})
/**
 * Filter tables or collection of objects.
 *  Search any property for result
 */
export class FilterCollectionPipe implements PipeTransform {

  transform(list: any[] | null, value: string): any[] {

    if (list != null)
      return list.filter((item) => JSON.stringify(item).toLowerCase().includes(value.toLowerCase()));
    return []
  }
}
