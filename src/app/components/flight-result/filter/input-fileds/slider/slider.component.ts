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
      this.maxValue = this.flightsService.filteringElements.maxValue;
      this.minValue = this.flightsService.filteringElements.minValue;

      this.max = this.maxValue;
      this.min = this.minValue;
    });
  }

  onChange() {
    this.flightsService.filterFlightsBasedOnPrice(this.maxValue, this.minValue);
  }
}
