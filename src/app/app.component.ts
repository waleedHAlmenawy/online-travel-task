/* Angular */
import { Component, OnInit } from '@angular/core';
import { FlightsService } from './services/flights.service';

/* Translation */
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from './services/translation.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  constructor(
    private flightsService: FlightsService,
    private translate: TranslateService,
    private translationService: TranslationService
  ) {
    this.translate.addLangs(['ar', 'en']);
    this.translate.use(
      this.translationService.lang ? this.translationService.lang : 'en'
    );
  }

  ngOnInit(): void {
    this.flightsService.getFlights();
  }
}
