import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
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
