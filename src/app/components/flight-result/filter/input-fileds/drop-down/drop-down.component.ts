import { Component, Input } from '@angular/core';
import { initialDropDown } from 'src/constants/dropDown.initial';
import { IDropDown } from 'src/models/dropDown.model';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss'],
})
export class DropDownComponent {
  @Input() dropDownData: IDropDown = initialDropDown;
}
