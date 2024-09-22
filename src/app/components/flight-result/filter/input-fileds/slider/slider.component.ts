/* Angular */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

/* Service */
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit, OnDestroy {
  private subscribtions = new Subscription();

  maxValue = 0;
  minValue = 0;
  max = 0;
  min = 0;

  constructor(private flightsService: FlightsService) {}

  /**
   * Retrieves max and min price either directly if they are already available in the service,
   * or subscribes to the service's subject to be notified when the data is loaded.
   */

  ngOnInit(): void {
    if (this.flightsService.allPrices.length) {
      this.flightsService.resetMinAndMaxValues();
      this.getValues();
    } else {
      const flightLoadedSub = this.flightsService
        .onFlightsLoaded()
        .subscribe(() => {
          this.getValues();
        });

      this.subscribtions.add(flightLoadedSub);
    }
  }

  /**
   * Retrieves the max and min price from the filteringElements property in the service
   */

  getValues() {
    this.maxValue = this.flightsService.filteringElements.maxValue;
    this.minValue = this.flightsService.filteringElements.minValue;

    this.max = this.maxValue;
    this.min = this.minValue;
  }

  /**
   * Filters flights based on a range of prices
   */

  onChange() {
    this.flightsService.filterFlightsBasedOnPrice(this.maxValue, this.minValue);
  }

  ngOnDestroy(): void {
    this.subscribtions.unsubscribe();
  }
}
