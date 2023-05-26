import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// const { persistAtom } = recoilPersist();

// const { persistAtom } = recoilPersist({
//   key: 'recoil-persist', // this key is using to store data in local storage
//   storage: localStorage, // configurate which storage will be used to store the data
// });
const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const asyncEffect = async () => {
      const { getValueFromLocalStorage } = await import(
        '../utils/getLocalStorage'
      );
      const value = getValueFromLocalStorage(key);
      setSelf(value);
    };
    asyncEffect();
    onSet((newValue: any, _: any, isReset: any) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const languageAtomState = atom({
  key: 'language', // unique ID
  default: 'mn',
  // effects: [localStorageEffect('mn')],
});
