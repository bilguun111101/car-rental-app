import { client } from '@/graphql/apollo_client';
import { GET_ALL_LANGUAGES } from '@/graphql/queries/language';

const GetLanguage = async () => {
  // 0) Get language texts from database
  // const { data: getAllLanguages } = useQuery(GET_ALL_LANGUAGES);

  const mnObj = {};
  const engObj = {};

  const data = await client.query({
    query: GET_ALL_LANGUAGES,
  });

  // 1)  Divide by ENGLISH, MONGOL
  const mn = data.data?.getLanguageText.filter(
    ({ lang }: { lang: string }) => lang === 'mn'
  );
  const eng = data.data?.getLanguageText.filter(
    ({ lang }: { lang: string }) => lang === 'eng'
  );

  // 2) { bookTxt: 'Захиалга' }
  mn?.forEach(({ textId, value }: { textId: string; value: string }) => {
    Object.assign(mnObj, { [textId]: value });
  });

  // 3) { bookTxt: 'Book' }
  eng?.forEach(({ textId, value }: { textId: string; value: string }) => {
    Object.assign(engObj, { [textId]: value });
  });

  // 4) Set data to local storage by ENG and MN
  // "localStorage is not defined" error happens when page refresh. Because nextjs SSR.
  typeof window !== 'undefined'
    ? window.localStorage.setItem('mn', JSON.stringify(mnObj))
    : false;

  typeof window !== 'undefined'
    ? window.localStorage.setItem('eng', JSON.stringify(engObj))
    : false;
};

export default GetLanguage;
