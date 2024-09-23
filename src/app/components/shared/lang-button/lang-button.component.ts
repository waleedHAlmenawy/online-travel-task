import { Component } from '@angular/core';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-lang-button',
  templateUrl: './lang-button.component.html',
  styleUrls: ['./lang-button.component.scss'],
})
export class LangButtonComponent {
  constructor(private translationService: TranslationService) {}

  getLang() {
    return this.translationService.lang === 'en' ? 'ar' : 'en';
  }

  changeLang() {
    this.translationService.changeLang();
  }
}
