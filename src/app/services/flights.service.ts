/* Angular */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/* Models */
import { IData } from 'src/models/data.model';
import { IFilter } from 'src/models/filter.model';

/* Others */
import { IAirItinerary } from 'src/models/airItinerary.model';
import { initialFilter } from 'src/constants/filter.initial';
import { calculateTotalPrice } from 'src/utils/calcTotalPrice';
import { bubbleSort } from 'src/utils/sorting';

@Injectable({
  providedIn: 'root',
})

/**
 * Service to manage flight data and filtering logic.
 *
 * This service handles fetching flights, managing filter criteria, and filtering flights
 * based on various user-defined parameters such as price, airline, stops, and refundability.
 */
export class FlightsService {
  /* List of all the flights */
  flights: IAirItinerary[] = [];

  /* List of filtered flights */
  filteredFlights: IAirItinerary[] = [];

  /* Object contains filtering elements such as max & min price */
  filteringElements: IFilter = initialFilter;

  /* All total prices for all the flights for max & min price filtering element */
  allPrices: number[] = [];

  /* All airlines for airline filtering element */
  airlines: string[] = [];

  /* URL to the JSON file that contains the flight data */
  jsonFlightsUrl = '../../assets/response.json';

  /* Subject that notifies subscribers when flights have been loaded */
  private flightsLoaded = new Subject<void>();

  constructor(private http: HttpClient) {}

  /**
   * - Retrieves flights and airline data from JSON file.
   * - Calculates total prices for flights and sorts them.
   * - Sets filtered flights to include all flights initially.
   * - Notifies subscribers when data is ready.
   */

  getFlights() {
    this.http.get<IData>(this.jsonFlightsUrl).subscribe({
      next: (data) => {
        this.flights = data.airItineraries;
        this.airlines = data.airlines;
      },
      complete: () => {
        this.flights.forEach((flight) => {
          flight.totalPrice = calculateTotalPrice(flight);
          this.allPrices.push(flight.totalPrice);
        });

        this.allPrices = bubbleSort(this.allPrices);
        this.resetMinAndMaxValues();

        this.filteredFlights = this.flights;

        this.flightsLoaded.next();
      },
    });
  }

  /**
   * Retrieves a flight by its sequence number.
   *
   * @param sequenceNum - The sequence number of the flight.
   * @returns The flight object or `undefined` if not found.
   */

  getFlightBySequenceNum(sequenceNum: number) {
    const flight = this.flights.find(
      (flight) => flight.sequenceNum === sequenceNum
    );

    return flight;
  }

  /**
   * Returns an observable that emits when the flights have been loaded.
   *
   * @returns An observable that emits when flight data is available.
   */

  onFlightsLoaded(): Observable<void> {
    return this.flightsLoaded.asObservable();
  }

  /**
   * Resets the minimum and maximum price values for filtering.
   */

  resetMinAndMaxValues() {
    this.filteringElements.maxValue =
      +this.allPrices.slice(-1)[0].toFixed(0) + 1000;
    this.filteringElements.minValue = +this.allPrices[0].toFixed(0) - 1000;
  }

  /**
   * Filters flights based on the current filtering elements (price, stops, airline, and refundability).
   *
   * - Filters out flights that do not meet the active filter criteria.
   * - Scrolls the window to the top after filtering.
   */

  filtering() {
    this.filteredFlights = this.flights.filter((flight) => {
      if (
        flight.totalPrice < this.filteringElements.minValue ||
        flight.totalPrice > this.filteringElements.maxValue
      ) {
        return false;
      }

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

      if (
        this.filteringElements.airline !== null &&
        flight.allJourney.flights[0].flightAirline.airlineName !==
          this.filteringElements.airline
      ) {
        return false;
      }

      return true;
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  filterFlightsBasedOnAirline(airline: string | null) {
    this.filteringElements.airline = airline;

    this.filtering();
  }

  filterFlightsBasedOnPrice(max: number, min: number) {
    this.filteringElements.maxValue = max;
    this.filteringElements.minValue = min;

    this.filtering();
  }

  filterFlightsBasedOnStops(value: number[]) {
    this.filteringElements.stops = value;

    this.filtering();
  }

  filterFlightsBasedOnRefundability(value: true | false | 'both') {
    this.filteringElements.isRefundable = value;

    this.filtering();
  }
}
