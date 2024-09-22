import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageModalComponent } from './message-modal/message-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { IAirItinerary } from 'src/models/airItinerary.model';
import { initialAirItinerary } from 'src/constants/airItinerary.initial';
import { FlightsService } from 'src/app/services/flights.service';
import { Subscription } from 'rxjs';
import { ICard } from 'src/models/card.model';
import { initialCard } from 'src/constants/card.initial';

@Component({
  selector: 'app-selected-flight',
  templateUrl: './selected-flight.component.html',
  styleUrls: ['./selected-flight.component.scss'],
})
export class SelectedFlightComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  flightSequenceNum = -1;
  card: ICard = initialCard;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private flightsService: FlightsService
  ) {}

  ngOnInit(): void {
    if (this.flightsService.flights.length) this.getFlightDetails();
    else {
      const flightsLoadedSub = this.flightsService
        .onFlightsLoaded()
        .subscribe(() => {
          this.getFlightDetails();
        });
      this.subscriptions.add(flightsLoadedSub);
    }
  }

  getFlightDetails() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.flightSequenceNum = +params.get('sequenceNum')!;
    });

    const temp = this.flightsService.getFlightBySequenceNum(
      this.flightSequenceNum
    );

    console.log(temp);

    if (temp) this.saveFlightDataToTheCard(temp);
  }

  saveFlightDataToTheCard(flight: IAirItinerary) {
    const obj = flight.allJourney.flights[0];
    this.card = {
      flightNumber: obj.flightDTO[0].flightInfo.flightNumber,
      airlineLogo: obj.flightAirline.airlineLogo,
      airlineCode: obj.flightAirline.airlineCode,
      airlineName: obj.flightAirline.airlineName,
      arrivalAirportCode: '',
      arrivalAirportName: '',
      departureAirportCode:
        obj.flightDTO[0].departureTerminalAirport.airportCode,
      departureAirportName:
        obj.flightDTO[0].departureTerminalAirport.airportCode,
      deptDate: flight.deptDate,
      arrivalDate: flight.arrivalDate,
      stops: obj.stopsNum,
      price: flight.totalPrice,
      isRefundable: flight.isRefundable,
      cabinClass: flight.cabinClass,
    };

    if (obj.stopsNum) {
      this.card.arrivalAirportName =
        obj.flightDTO[1].arrivalTerminalAirport.airportName;
      this.card.arrivalAirportCode =
        obj.flightDTO[1].arrivalTerminalAirport.airportCode;
    } else {
      this.card.arrivalAirportName =
        obj.flightDTO[0].arrivalTerminalAirport.airportName;
      this.card.arrivalAirportCode =
        obj.flightDTO[0].arrivalTerminalAirport.airportCode;
    }
  }

  openModal() {
    this.dialog.open(MessageModalComponent, {
      panelClass: 'custom-dialog-container',
    });
  }

  onClickBack() {
    this.router.navigate(['/flight-results']);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
