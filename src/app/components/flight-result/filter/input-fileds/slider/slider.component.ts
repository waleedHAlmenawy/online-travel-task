import {
  AfterContentInit,
  AfterViewInit,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  maxValue = 0;
  minValue = 0;
  max = 0;
  min = 0;

  constructor(private flightsService: FlightsService) {}

  ngOnInit(): void {
    this.flightsService.onFlightsLoaded().subscribe(() => {
      this.maxValue =
        +this.flightsService.allPrices.slice(-1)[0].toFixed(2) + 1000;
      this.minValue = +this.flightsService.allPrices[0].toFixed(2) - 1000;

      this.max = this.maxValue;
      this.min = this.minValue;
    });
  }

  onChange() {
    this.flightsService.filterFlightsBasedOnPrice(this.maxValue, this.minValue);
  }
}
