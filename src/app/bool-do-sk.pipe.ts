import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolDoSK',
  standalone: true
})
export class BoolDoSKPipe implements PipeTransform {

  transform(value: any): string {
    if (typeof value !== "boolean") {
      return "Nezadefinovane"
    }
    return value ? "Ano" : "Nie"
  }

}
