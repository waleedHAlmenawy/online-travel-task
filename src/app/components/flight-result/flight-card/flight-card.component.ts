import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initialAirItinerary } from 'src/constants/airItinerary.initial';
import { initialCard } from 'src/constants/card.initial';
import { IAirItinerary } from 'src/models/airItinerary.model';
import { ICard } from 'src/models/card.model';
import { calculateTotalPrice } from 'src/utils/calcTotalPrice';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss'],
})
export class FlightCardComponent implements OnInit {
  @Input() flight: IAirItinerary = initialAirItinerary;
  card: ICard = initialCard;

  constructor(private router: Router) {}

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

  onClickFlightDetails() {
    this.router.navigate(['selected-flight', this.flight.sequenceNum]);
  }
}
