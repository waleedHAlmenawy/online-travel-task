/* Angular */
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/* Models */
import { IAirItinerary } from 'src/models/airItinerary.model';
import { ICard } from 'src/models/card.model';

/* Others */
import { initialCard } from 'src/constants/card.initial';
import { initialAirItinerary } from 'src/constants/airItinerary.initial';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss'],
})
export class FlightCardComponent implements OnInit {
  @Input() flight: IAirItinerary = initialAirItinerary;
  card: ICard = initialCard;

  constructor(private router: Router) {}

  /**
   * Populates the card property with relevant flight card extracted from the provided flight object from the parent.
   *
   * If the flight includes stops, the arrival airport information is updated accordingly.
   */

  ngOnInit(): void {
    const obj = this.flight.allJourney.flights[0];
    this.card = {
      flightNumber: obj.flightDTO[0].flightInfo.flightNumber,
      airlineLogo: obj.flightAirline.airlineLogo,
      airlineCode: obj.flightAirline.airlineCode,
      airlineName: obj.flightAirline.airlineName,
      arrivalAirportCode: '',
      departureAirportCode:
        obj.flightDTO[0].departureTerminalAirport.airportCode,
      deptDate: this.flight.deptDate,
      arrivalDate: this.flight.arrivalDate,
      stops: obj.stopsNum,
      price: this.flight.totalPrice,
    };

    if (obj.stopsNum) {
      this.card.arrivalAirportCode =
        obj.flightDTO[1].arrivalTerminalAirport.airportCode;
    } else {
      this.card.arrivalAirportCode =
        obj.flightDTO[0].arrivalTerminalAirport.airportCode;
    }
  }

  /**
   * Navigates to the flight details screen with the sequence number
   */

  onClickFlightDetails() {
    this.router.navigate(['selected-flight', this.flight.sequenceNum]);
  }
}
