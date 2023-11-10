import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IJourney, IResultJourney, IState } from 'src/app/shared/interfaces/interface';
import { AppSelector } from 'src/app/shared/store/state-store';
import { takeWhile } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss']
})
export class JourneyComponent implements OnInit {

  appSelector: AppSelector = new AppSelector();

  subscriptions = new Array<Subscription>();

  journeys: IJourney[] = [];

  constructor(
    private storeApp: Store<IState>,
  ) { }

  ngOnInit(): void {

    let cargado = false;
    this.storeApp
      .select(this.appSelector.getFlights())
      .pipe(
        takeWhile(() => !cargado)
      )
      .subscribe((datos: any) => {
        if (datos?.resultJourney?.length > 0) {
          this.subscriptions.push(
            this.storeApp.select(this.appSelector.getBadge()).subscribe((badge) => {
              if (badge !== undefined) {
                this.journeys = datos.resultJourney;
                this.calculateBadge(badge.result);
              }
            })
          );
          cargado = true;
        }
      });
  }


  /**
  * @description recalculate the price
  * @author Brayan Rios
  * @date 09/11/2023
  * @param {any} resultJourney
  * * @param {number} badge
  */
  calculateBadge(badge: number) {
    let journeysTemp = this.journeys.map(journey => {
      let updatedJourney = { ...journey };
      updatedJourney.price = journey.price * badge;

      updatedJourney.flights = journey.flights.map(flight => {
        let updatedFlight = { ...flight };
        updatedFlight.price = flight.price * badge;
        return updatedFlight;
      });

      return updatedJourney;
    });

    this.journeys = journeysTemp;
  }

}
