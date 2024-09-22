import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FlightResultComponent } from './components/flight-result/flight-result.component';
import { SelectedFlightComponent } from './bonus/selected-flight/selected-flight.component';
import { FilterComponent } from './components/flight-result/filter/filter.component';
import { FlightCardComponent } from './components/flight-result/flight-card/flight-card.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SliderComponent } from './components/flight-result/filter/input-fileds/slider/slider.component';
import { CheckBoxesComponent } from './components/flight-result/filter/input-fileds/check-boxes/check-boxes.component';
import { RadioButtonsComponent } from './components/flight-result/filter/input-fileds/radio-buttons/radio-buttons.component';
import { TimeFormatPipe } from './pipes/time-format.pipe';
import { DurationPipe } from './pipes/duration.pipe';
import { AutocompleteComponent } from './components/flight-result/filter/input-fileds/autocomplete/autocomplete.component';
import { MessageModalComponent } from './bonus/selected-flight/message-modal/message-modal.component';
import { NotFound404Component } from './components/not-found404/not-found404.component';

const materialModules = [
  MatSidenavModule,
  MatExpansionModule,
  MatMenuModule,
  MatSelectModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatSliderModule,
  MatCheckboxModule,
  MatRadioModule,
  MatAutocompleteModule,
  MatDialogModule,
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FlightResultComponent,
    SelectedFlightComponent,
    FilterComponent,
    FlightCardComponent,
    NavbarComponent,
    SliderComponent,
    CheckBoxesComponent,
    RadioButtonsComponent,
    TimeFormatPipe,
    DurationPipe,
    AutocompleteComponent,
    MessageModalComponent,
    NotFound404Component,
  ],
  imports: [
    materialModules,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
