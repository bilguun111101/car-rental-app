import { languageAtomState } from '@/atoms/languageAtom';
import { useRecoilValue } from 'recoil';

const useLanguage = (texts: string[]) => {
  const languageChange = useRecoilValue(languageAtomState);

  //1) Get language text object from local storage
  const data =
    typeof window !== 'undefined'
      ? window.localStorage.getItem(languageChange)
      : false;

  //2) Find the given text from language object
  if (data) {
    const obj = JSON.parse(data);
    return texts.map((value: string) => obj[value] || value); //['Book', 'Account' etc.]
  }

  //3) If there is no data, then return it back
  return texts;
};

export default useLanguage;
