import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  @Input() source = '';
  @Input() title = 'Icon';
  @Output() iconClicked = new EventEmitter<void>();

  handleClick() {
    this.iconClicked.emit();
  }
}
