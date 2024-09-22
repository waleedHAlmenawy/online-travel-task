import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageModalComponent } from './message-modal/message-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selected-flight',
  templateUrl: './selected-flight.component.html',
  styleUrls: ['./selected-flight.component.scss'],
})
export class SelectedFlightComponent {
  constructor(public dialog: MatDialog, private router: Router) {}

  openModal() {
    this.dialog.open(MessageModalComponent, {
      panelClass: 'custom-dialog-container',
    });
  }

  onClickBack() {
    this.router.navigate(['/flight-results']);
  }
}
