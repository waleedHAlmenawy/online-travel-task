/* Angular */
import { Component } from '@angular/core';

/* Service */
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-check-boxes',
  templateUrl: './check-boxes.component.html',
  styleUrls: ['./check-boxes.component.scss'],
})
export class CheckBoxesComponent {
  selectedValues: any = {};
  checkedValues: number[] = [];

  constructor(private flightsService: FlightsService) {}

  /**
   * Updates the list of checked values based on checkbox interactions and filters flights accordingly.
   *
   * @param option - The identifier of the checkbox option.
   * @param isChecked - The new checked state of the checkbox.
   */

  onCheckboxChange(option: number, isChecked: boolean) {
    if (isChecked) {
      this.checkedValues.push(option);
    } else {
      const index = this.checkedValues.indexOf(option);
      if (index > -1) {
        this.checkedValues.splice(index, 1);
      }
    }
    this.flightsService.filterFlightsBasedOnStops(this.checkedValues);
  }
}
