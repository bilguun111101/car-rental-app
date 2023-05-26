import CardBox from './CardBox';

export const AddExtras = () => {
  const addExtrasArray = [
    {
      id: '1',
      image: 'https://cdn-icons-png.flaticon.com/512/4544/4544523.png',
      typeDefinitionMGL: 'Даатгал',
      typeDefinition: 'Coverage',
      text: 'Үндсэн болон бусад нэмэлт даатгал',
      price: '$ 7.00 / өдөр',
    },
    {
      id: '2',
      image: 'https://cdn-icons-png.flaticon.com/512/5557/5557145.png',
      typeDefinitionMGL: 'Хүүхдийн аюулгүйн бүс',
      typeDefinition: 'Child Safety Seat',
      text: 'Аюулгүй зорчих',
      price: '$ 5.00 / өдөр',
    },
    {
      id: '3',
      image: 'https://cdn-icons-png.flaticon.com/512/5248/5248673.png',
      typeDefinitionMGL: 'GPS',
      typeDefinition: 'GPS',
      text: 'GPS байршил тогтоогчоор хаана яваагаа үргэлж хянах',
      price: '$ 7.00 / өдөр',
    },
  ];

  return (
    <>
      {addExtrasArray.map((extras) => (
        <CardBox key={extras.id} {...extras} />
      ))}
    </>
  );
};

export default AddExtras;
