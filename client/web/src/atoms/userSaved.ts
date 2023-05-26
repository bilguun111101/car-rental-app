import { atom } from 'recoil';

// 3) Creating global state
export const refreshUserData = atom({
  key: 'savedUser', // unique ID
  default: false, // default value (aka initial value)
});
