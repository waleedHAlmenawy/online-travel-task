/* Angular */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  constructor(private router: Router) {}

  onClickLogo() {
    this.router.navigate(['/']);
  }
}
