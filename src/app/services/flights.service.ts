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
      if (
        flight.totalPrice < this.filteringElements.minValue ||
        flight.totalPrice > this.filteringElements.maxValue
      ) {
        return false;
      }

      console.log(
        this.filteringElements.stops,
        flight.allJourney.flights[0].stopsNum
      );

      if (
        this.filteringElements.stops.length &&
        !this.filteringElements.stops.includes(
          flight.allJourney.flights[0].stopsNum
        )
      ) {
        return false;
      }

      if (
        this.filteringElements.isRefundable !== 'both' &&
        flight.isRefundable === this.filteringElements.isRefundable
      ) {
        return false;
      }

      // if (
      //   !(
      //     flight.allJourney.flights[0].flightAirline.airlineName ===
      //     this.filteringElements.airline
      //   )
      // ) {
      //   return false;
      // }

      return true;
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

  filterFlightsBasedOnStops(value: number[]) {
    this.filteringElements.stops = value;

    this.filtering();
  }
}
