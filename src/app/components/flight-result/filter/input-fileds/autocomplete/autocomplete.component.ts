/* Angular */
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

/* Service */
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent {
  airlines: string[] = [];
  inputValue: string = '';

  constructor(private flightsService: FlightsService) {}

  arabicRegex = /[\u0600-\u06FF\u0750-\u077F]/;

  preventArabic(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.keyCode || event.which);

    if (this.arabicRegex.test(inputChar)) {
      event.preventDefault();
    }
  }

  /**
   * Filters airlines based on the input
   *
   * When the airline property contains data, a drop down menu will be shown
   *
   * - If the input is empty, the airline property is cleared and a default flight filter is applied.
   *
   * @param e - The event that holds changed data
   */

  onChange(e: any) {
    if (e.target.value) {
      this.airlines = this.flightsService.airlines.filter((airline) =>
        airline.toLowerCase().includes(e.target.value.toLowerCase())
      );
    } else {
      this.airlines = [];
      this.flightsService.filterFlightsBasedOnAirline(null);
    }
  }

  /**
   * Filters the flight cards based on the airline
   *
   * It also cleared the airline property
   *
   * @param airline - The selected airline from the drop down
   */

  onSelect(airline: string) {
    this.inputValue = airline;
    this.airlines = [];
    this.flightsService.filterFlightsBasedOnAirline(airline);
  }
}
