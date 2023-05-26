import { atom } from 'recoil';

// 3) Creating global state
export const closeModalState = atom({
  key: 'modalState', // unique ID
  default: false, // default value (aka initial value)
});
