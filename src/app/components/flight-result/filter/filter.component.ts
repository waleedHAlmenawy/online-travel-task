import { Component } from '@angular/core';
import { FlightsService } from 'src/app/services/flights.service';
import { IDropDown } from 'src/models/dropDown.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  from: IDropDown = {
    label: 'From',
    options: ['Cairo', 'Kuwait', 'Qatar'],
  };
  to: IDropDown = {
    label: 'To',
    options: ['Cairo', 'Kuwait', 'Qatar'],
  };

  constructor(private flightsService: FlightsService) {}
}
