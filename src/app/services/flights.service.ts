import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IAirItinerary } from 'src/models/airItinerary.model';
import { IData } from 'src/models/data.model';
import { calculateTotalPrice } from 'src/utils/calcTotalPrice';
import { bubbleSort } from 'src/utils/sorting';

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  flights: IAirItinerary[] = [];
  filteredFlights: IAirItinerary[] = [];
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
        this.filteredFlights = this.flights;

        this.flightsLoaded.next();
      },
    });
  }

  onFlightsLoaded(): Observable<void> {
    return this.flightsLoaded.asObservable();
  }

  filterFlightsBasedOnPrice(max: number, min: number) {
    this.filteredFlights = this.flights.filter((flight) => {
      return flight.totalPrice >= min && flight.totalPrice <= max;
    });
  }
}
