import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nezadefinovane',
  standalone: true
})
export class NezadefinovanePipe implements PipeTransform {

  transform(value: unknown): unknown {
    return value ? value : "Nezadefinovane";
  }

}
