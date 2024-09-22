/* Angular */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
})
export class TimeFormatPipe implements PipeTransform {
  /**
   * Pipe to format a date string into a "HH:mm" time format.
   *
   * Transforms a date string into a time string with leading zeros for hours and minutes.
   *
   * @param value - The input date string.
   * @returns A formatted string representing the time in "HH:mm" format.
   */

  transform(value: string): string {
    const date = new Date(value);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}
