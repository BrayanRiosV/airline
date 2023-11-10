import { ActionReducerMap } from '@ngrx/store';
import { AppStore } from './state-store';
import { IState} from '../interfaces/interface';
const appStore: AppStore = new AppStore();

export const appStateReducers: ActionReducerMap<IState> = {
  bookmark: appStore.reducerBookmark,
};
