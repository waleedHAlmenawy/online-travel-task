import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent {
  myControl = new FormControl('');
  airlines: string[] = [];
  inputValue: string = '';

  constructor(private flightsService: FlightsService) {}

  arabicRegex = /[\u0600-\u06FF\u0750-\u077F]/;

  preventArabic(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.keyCode || event.which);

    if (this.arabicRegex.test(inputChar)) {
      event.preventDefault();
    }
  }

  onChange(e: any) {
    if (e.target.value) {
      this.airlines = this.flightsService.airlines.filter((airline) =>
        airline.toLowerCase().includes(e.target.value.toLowerCase())
      );
    } else {
      this.airlines = [];
      this.flightsService.filterFlightsBasedOnAirline(null);
    }
  }

  onSelect(airline: string) {
    this.inputValue = airline;
    this.airlines = [];
    this.flightsService.filterFlightsBasedOnAirline(airline);
  }
}
