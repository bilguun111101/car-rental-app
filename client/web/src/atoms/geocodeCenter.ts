import { atom } from 'recoil';

export const geocodeCenter = atom<number[]>({
  key: 'centerGeocode', // unique ID
  default: [],
});
