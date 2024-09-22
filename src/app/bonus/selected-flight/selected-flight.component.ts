import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageModalComponent } from './message-modal/message-modal.component';

@Component({
  selector: 'app-selected-flight',
  templateUrl: './selected-flight.component.html',
  styleUrls: ['./selected-flight.component.scss'],
})
export class SelectedFlightComponent {
  constructor(public dialog: MatDialog) {}

  openModal() {
    this.dialog.open(MessageModalComponent, {
      panelClass: 'custom-dialog-container',
    });
  }
}
