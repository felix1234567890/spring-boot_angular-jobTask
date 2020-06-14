import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temp',
})
export class TempPipe implements PipeTransform {
  transform(value: string): string {
    return `${parseInt(value, 10)}°C`;
  }
}
