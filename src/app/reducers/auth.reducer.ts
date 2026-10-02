import { createReducer, on } from '@ngrx/store';
import { UserModel } from '../models/user.model';
import { AuthActions } from '../actions/action.type';

export interface AuthState {
  user?: UserModel;
}

export const initialAuthState: AuthState = {
  user: undefined,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
);
