import Card from './Card';

type Props = {
  carsData: CarsType[];
};

const Vehicles = ({ carsData }: Props) => {
  return (
    <div>
      {carsData.length > 0 &&
        carsData.map((car) => <Card key={car.id} {...car} />)}
    </div>
  );
};

export default Vehicles;
