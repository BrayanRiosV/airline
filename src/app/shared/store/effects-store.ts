import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppStore } from './state-store';
import { mergeMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { IResultJourney, IState } from '../interfaces/interface';
import { ServiceService } from '../service.service';

@Injectable()
export class AppEffects {
    appStore: AppStore = new AppStore();


    dataJourney$ = createEffect(() => this.actions$.pipe(
      ofType(this.appStore.getJourneys),
      mergeMap(({ ...url }) =>
          this.service.actionGet(url.url).pipe(
              map((result: IResultJourney) => {
                  if (result.status === 'success') {
                      return this.appStore.setData({ resultJourney: result });
                  }else{
                    return this.appStore.saveData({ resultJourney: result });
                  }
              })
          )
      )
  ))

  dataBadges$ = createEffect(() => this.actions$.pipe(
    ofType(this.appStore.getBadges),
    mergeMap(() =>
        this.service.getExchangeRates('USD').pipe(
            map((result: any) => {
                if (result.status === 'success') {
                    return this.appStore.loadBadge({ ...result });
                }else{
                  return this.appStore.saveBadge({ ...result });
                }
            })
        )
    )
))


    constructor(private actions$: Actions, private storeApp: Store<IState>, private service: ServiceService) {}
}
