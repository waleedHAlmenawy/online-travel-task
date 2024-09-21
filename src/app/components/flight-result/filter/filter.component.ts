import { Component } from '@angular/core';
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
}
