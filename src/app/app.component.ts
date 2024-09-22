import { Component, OnInit } from '@angular/core';
import { FlightsService } from './services/flights.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  constructor(private flightsService: FlightsService) {}

  ngOnInit(): void {
    this.flightsService.getFlights();
  }
}
