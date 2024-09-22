import { Component, OnInit } from '@angular/core';
import { FlightsService } from 'src/app/services/flights.service';
import { IAirItinerary } from 'src/models/airItinerary.model';

@Component({
  selector: 'app-flight-result',
  templateUrl: './flight-result.component.html',
  styleUrls: ['./flight-result.component.scss'],
})
export class FlightResultComponent implements OnInit {
  isSidenavOpened = true;

  constructor(private flightsService: FlightsService) {}

  ngOnInit(): void {
    this.flightsService.getFlights();
  }

  getFlights() {
    return this.flightsService.filteredFlights;
  }

  onClickFilter() {
    this.isSidenavOpened = !this.isSidenavOpened;
  }
}
