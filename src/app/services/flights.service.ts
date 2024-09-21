import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { initialFilter } from 'src/constants/filter.initial';
import { IAirItinerary } from 'src/models/airItinerary.model';
import { IData } from 'src/models/data.model';
import { IFilter } from 'src/models/filter.model';
import { calculateTotalPrice } from 'src/utils/calcTotalPrice';
import { bubbleSort } from 'src/utils/sorting';

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  flights: IAirItinerary[] = [];
  filteredFlights: IAirItinerary[] = [];
  filteringElements: IFilter = initialFilter;

  allPrices: number[] = [];
  jsonFlightsUrl = '../../assets/response.json';

  private flightsLoaded = new Subject<void>();

  constructor(private http: HttpClient) {}

  getFlights() {
    this.http.get<IData>(this.jsonFlightsUrl).subscribe({
      next: (data) => {
        this.flights = data.airItineraries;
      },
      complete: () => {
        this.flights.forEach((flight) => {
          flight.totalPrice = calculateTotalPrice(flight);
          this.allPrices.push(flight.totalPrice);
        });

        this.allPrices = bubbleSort(this.allPrices);
        this.filteringElements.maxValue =
          +this.allPrices.slice(-1)[0].toFixed(2) + 1000;
        this.filteringElements.minValue = +this.allPrices[0].toFixed(2) - 1000;
        this.filteredFlights = this.flights;

        this.flightsLoaded.next();
      },
    });
  }

  onFlightsLoaded(): Observable<void> {
    return this.flightsLoaded.asObservable();
  }

  filtering() {
    this.filteredFlights = this.flights.filter((flight) => {
      let passedTheFilter = true;

      if (
        !(
          flight.totalPrice >= this.filteringElements.minValue &&
          flight.totalPrice <= this.filteringElements.maxValue
        )
      ) {
        passedTheFilter = false;
      }

      // if (
      //   !(
      //     flight.allJourney.flights[0].stopsNum === this.filteringElements.stops
      //   )
      // ) {
      //   passedTheFilter = false;
      // }

      if (this.filteringElements.isRefundable !== 'both') {
        if (!(flight.isRefundable === this.filteringElements.isRefundable))
          passedTheFilter = false;
      }

      // if (
      //   !(
      //     flight.allJourney.flights[0].flightAirline.airlineName ===
      //     this.filteringElements.airline
      //   )
      // ) {
      //   passedTheFilter = false;
      // }

      return passedTheFilter;
    });

    console.log(this.filteredFlights.length);
  }

  filterFlightsBasedOnPrice(max: number, min: number) {
    this.filteringElements.maxValue = max;
    this.filteringElements.minValue = min;

    this.filtering();
  }

  filterFlightsBasedOnRefundability(value: true | false | 'both') {
    this.filteringElements.isRefundable = value;

    this.filtering();
  }
}
