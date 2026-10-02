import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../environments/environments';
import { authReducer, AuthState } from './auth.reducer';

export interface AppState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
