import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() title = 'BUTTON';
  @Input() btnStyle = {};
  @Output() buttonClicked = new EventEmitter<string>();

  onClick() {
    this.buttonClicked.emit('buttonClicked');
  }
}
