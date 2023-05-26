import { atom } from 'recoil';

// 1) Declaring type
export interface AuthModalState {
  open: boolean;
  view: 'login' | 'signup' | 'resetPassword';
}

// 2) Defining Default State
const defaultModalState: AuthModalState = {
  open: false,
  view: 'login',
};

// 3) Creating global state
export const authModalState = atom<AuthModalState>({
  key: 'authModalState', // unique ID
  default: defaultModalState, // default value (aka initial value)
});

export type ModalView = 'login' | 'signup' | 'resetPassword';
