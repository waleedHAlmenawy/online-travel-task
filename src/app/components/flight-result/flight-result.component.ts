/* Angular */
import { Component, OnInit } from '@angular/core';

/* Services */
import { FlightsService } from 'src/app/services/flights.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-flight-result',
  templateUrl: './flight-result.component.html',
  styleUrls: ['./flight-result.component.scss'],
})
export class FlightResultComponent implements OnInit {
  isSidenavOpened = false;

  constructor(
    private flightsService: FlightsService,
    private translation: TranslationService
  ) {}

  /**
   * Resets the filtered flights to include all flights on initialization.
   *
   * Used to reset the flight cards.
   */

  ngOnInit(): void {
    this.flightsService.filteredFlights = this.flightsService.flights;
  }

  /**
   * Getter for the filteredFlights property in the service
   */

  getFlights() {
    return this.flightsService.filteredFlights;
  }

  /**
   * Opens flitering sidebar
   */

  onClickFilter() {
    this.isSidenavOpened = !this.isSidenavOpened;
  }

  getSelectedLang() {
    return this.translation.lang;
  }
}
