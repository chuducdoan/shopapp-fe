import { createAction, props } from '@ngrx/store';
import { UserModel } from '../models/user.model';

export const login = createAction('[Login Page] User Login', props<{ user: UserModel }>());

export const logout = createAction('[Top Menu] Logout');
