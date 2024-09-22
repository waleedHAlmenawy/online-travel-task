import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss'],
})
export class MessageModalComponent {
  constructor(private router: Router) {}
  goHome() {
    this.router.navigate(['/']);
  }
}
