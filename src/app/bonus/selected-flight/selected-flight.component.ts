/* Angular */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

/* Components */
import { MessageModalComponent } from './message-modal/message-modal.component';

/* Services */
import { FlightsService } from 'src/app/services/flights.service';

/* Models */
import { ICard } from 'src/models/card.model';
import { IAirItinerary } from 'src/models/airItinerary.model';

/* Others */
import { MatDialog } from '@angular/material/dialog';
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
  isNotFound = false;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private flightsService: FlightsService
  ) {}

  /**
   * Retrieves flight details either directly if they are already available in the service,
   * or subscribes to the service's subject to be notified when the data is loaded.
   */

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

  /**
   * Retrieves the flight details based on the sequence number in the url
   *
   * - If the flight not found it will change the ui based on isNotFound property
   */

  getFlightDetails() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.flightSequenceNum = +params.get('sequenceNum')!;
    });

    const temp = this.flightsService.getFlightBySequenceNum(
      this.flightSequenceNum
    );

    if (temp) this.saveFlightDataToTheCard(temp);
    else this.isNotFound = true;
  }

  /**
   * Populates the card property with relevant flight details extracted from the provided flight object.
   *
   * If the flight includes stops, the arrival airport information is updated accordingly.
   *
   * @param flight - The flight itinerary data of type IAirItinerary from which to extract details.
   */

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
