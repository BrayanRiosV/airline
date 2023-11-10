import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './shared/store/effects-store';
import { appStateReducers } from './shared/store/mapReducers';

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
    return function (state, action) {
        return reducer(state, action);
    };
}

export const CONFIG_GNRX = [
    StoreModule.forRoot(appStateReducers, {
        runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true,
            strictActionSerializability: true,
            strictStateSerializability: true,
        },
    }),
    StoreDevtoolsModule.instrument({
    }),
    EffectsModule.forRoot([AppEffects]),
];
