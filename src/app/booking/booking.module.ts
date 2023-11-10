import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { ReservationComponent } from './reservation/reservation.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { JourneyComponent } from './journey/journey.component';


@NgModule({
  declarations: [
    ReservationComponent,
    JourneyComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class BookingModule { }
