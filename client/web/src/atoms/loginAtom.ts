import { atom } from 'recoil';

export const loggedInState = atom({
  key: 'signedIn', // unique ID
  default: false,
});
