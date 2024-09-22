/*Angular */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found404',
  templateUrl: './not-found404.component.html',
  styleUrls: ['./not-found404.component.scss'],
})
export class NotFound404Component {
  constructor(private router: Router) {}

  onClickHome() {
    this.router.navigate(['/']);
  }
}
