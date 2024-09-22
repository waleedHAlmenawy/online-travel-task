/* Angular */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  /**
   * Pipe to calculate and format the duration between two dates.
   *
   * Transforms departure and arrival dates into a formatted duration in the format "HHh MMm".
   *
   * @param deptDate - The departure date as a string.
   * @param arrivalDate - The arrival date as a string.
   * @returns A string representing the time difference between the two dates in hours and minutes.
   */

  transform(deptDate: string, arrivalDate: string): string {
    const dept = new Date(deptDate);
    const arrival = new Date(arrivalDate);

    const diffInMs = arrival.getTime() - dept.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;

    return `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(
      2,
      '0'
    )}m`;
  }
}
