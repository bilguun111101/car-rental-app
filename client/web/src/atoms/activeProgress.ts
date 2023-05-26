import { atom } from 'recoil';

export const activeProgress = atom({
  key: 'progressActive', // unique ID
  default: {
    page_car: false,
    page_extras: false,
    page_review: false,
  },
});
