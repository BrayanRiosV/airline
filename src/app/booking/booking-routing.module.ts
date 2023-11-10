import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationComponent } from './reservation/reservation.component';
import { JourneyComponent } from './journey/journey.component';

const routes: Routes = [{
  path: '',
  component: ReservationComponent,
},
{
  path: 'flys',
  component: JourneyComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
