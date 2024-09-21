import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent {
  maxValue = 500;
  minValue = 100;

  onChange() {
    console.log(this.maxValue, this.minValue);
  }
}
