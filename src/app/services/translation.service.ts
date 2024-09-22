import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  lang: string | null = 'en';

  constructor(private translateService: TranslateService) {}

  changeLang() {
    if (this.lang == 'en') {
      this.translateService.use('ar');
      this.lang = 'ar';
    } else {
      this.translateService.use('en');
      this.lang = 'en';
    }
  }
}
