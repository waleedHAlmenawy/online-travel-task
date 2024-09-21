import { Component } from '@angular/core';
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-radio-buttons',
  templateUrl: './radio-buttons.component.html',
  styleUrls: ['./radio-buttons.component.scss'],
})
export class RadioButtonsComponent {
  constructor(private flightsService: FlightsService) {}

  onChange(e: any) {
    this.flightsService.filterFlightsBasedOnRefundability(e.value);
  }
}
