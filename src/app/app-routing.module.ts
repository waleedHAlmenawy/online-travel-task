import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FlightResultComponent } from './components/flight-result/flight-result.component';
import { SelectedFlightComponent } from './bonus/selected-flight/selected-flight.component';
import { NotFound404Component } from './components/not-found404/not-found404.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'flight-results', component: FlightResultComponent },
  { path: 'selected-flight/:id', component: SelectedFlightComponent },
  { path: '**', component: NotFound404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
