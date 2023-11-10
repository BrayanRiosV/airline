import { Action, createAction, createReducer, createSelector, on, props } from '@ngrx/store';
import { IJourney, IPathGet, IResultJourney, IState, IStateBookmark } from '../interfaces/interface';

export class AppStore {

  bookmark: IStateBookmark = {
    badge: 'USD',
    action: '',
    badges: {},
    model: {
      origin: '',
      destination: '',
      limit: 0,
    },
    resultJourney: {
      message: '',
      status: '',
      journeys: []
    }
  };

  private LOAD_STATE = '[APP_STORE] State initial of the application';
  private GET_JOURNEYS = '[APP_STORE] Get data from server';
  private SET_JOURNEYS = '[APP_STORE] Set data from server';
  private SAVE_JOURNEYS = '[APP_STORE] Save data from server';
  private GET_BADGES = '[APP_STORE] Get badges from api';
  private SET_BADGE = '[APP_STORE] Set principal badget from user'

  reducerEventsBookmark = (state = this.bookmark, action: Action): IStateBookmark => this.reducerBookmark(state, action);
  getJourneys = createAction(this.GET_JOURNEYS, props<IPathGet>());
  getBadges = createAction(this.GET_BADGES);
  loadState = createAction(this.LOAD_STATE,);
  setData = createAction(this.SET_JOURNEYS, props<{ resultJourney: IResultJourney }>());
  saveData = createAction(this.SAVE_JOURNEYS, props<{ resultJourney: IResultJourney }>());
  loadBadge = createAction(this.GET_BADGES, props<{ badge: any }>());
  saveBadge = createAction(this.SAVE_JOURNEYS, props<{ badge: any }>());
  setBadge = createAction(this.SET_BADGE, props<{ badge: string }>())

  reducerBookmark = createReducer(
    this.bookmark,
    on(this.loadState, (state) => ({ ...this.bookmark })),
    on(this.setData, (state, resultJourney) => {
      const mod = { ...state };
      mod['resultJourney'] = { ...resultJourney.resultJourney };
      state = { ...mod };
      return state;
    }),
    on(this.saveData, (state, resultJourney) => {
      const mod = { ...state };
      mod['resultJourney'] = { ...resultJourney.resultJourney };
      state = { ...mod };
      return state;
    }),
    on(this.loadBadge, (state, badge) => {
      const mod = { ...state };
      if (mod.badges !== '{}') {
        mod['badges'] = { ...badge };
        state = { ...mod };
      }
      return state;
    }),
    on(this.saveBadge, (state, badge) => {
      const mod = { ...state };
      mod['badges'] = { ...badge };
      state = { ...mod };
      return state;
    }),
    on(this.setBadge, (state, { badge }) => this.cambio(state, badge))
  )


  private cambio(state: IStateBookmark, badge: string) {
    const mod = { ...state };
    mod.badge = badge;
    mod.action = 'Change Badget';
    state = { ...mod };
    return state;
  }

}

export class AppSelector {
  getFlights = () =>
    createSelector(
      (state: IState) => state['bookmark']['resultJourney']['journeys'],
      (state: IJourney[]) => {
        return { resultJourney: state };
      }
    );


  getBadge = () =>
    createSelector(
      (state: IState,) => state['bookmark'],
      (bookmark: IStateBookmark) => {
        if (bookmark && bookmark.badges && bookmark.badge && bookmark.badges.conversion_rates) {
          const result = bookmark.badges.conversion_rates[bookmark.badge];
          return { result: result };
        } else {
          return { result: null }; // Maneja el caso cuando las propiedades no están definidas
        }
      }
    );
}
