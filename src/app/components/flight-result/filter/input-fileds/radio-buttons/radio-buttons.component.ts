/* Angular */
import { Component } from '@angular/core';

/* Service */
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-radio-buttons',
  templateUrl: './radio-buttons.component.html',
})
export class RadioButtonsComponent {
  constructor(private flightsService: FlightsService) {}

  /**
   * Filters flights based on refundability selection.
   *
   * @param e - The event containing the selected refundability option.
   */

  onChange(e: any) {
    this.flightsService.filterFlightsBasedOnRefundability(e.value);
  }
}
