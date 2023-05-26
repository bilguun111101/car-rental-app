type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  age: string;
  role: Role;
};

type Inputs = {
  email: string;
  password: string;
};
type createUserFormType = {
  email: string;
  password: string;
  role: string;
};
type loginUserFormType = {
  email: string;
  password: string;
};

interface CarsType {
  id: string;
  image: string;
  type: string;
  typeDefinition: string;
  model: string;
  transmission: string;
  kml: number;
  passengers: number;
  price: number;
  user: User;
  userId: string;
}

interface CarType {
  image: string;
  type: string;
  typeDefinition: string;
  model: string;
  transmission: string;
  kml: number;
  passengers: number;
  price: number;
}

interface createCarDataType extends CarType {
  userId: string;
}

type RentalType = {
  userId: string;
  dateRent: string;
  dateReturn: string;
  totalDays: number;
  location: string;
  verified: boolean;
  extras: {
    coverage: boolean;
    child_safety: boolean;
    GPS: boolean;
  };
  car: CarType;
};

interface UserData {
  email: string;
  name: string;
  phone: string;
  age: string;
  role: string;
  rentals: RentalType;
  cars: CarsType[];
}

interface SearchResultsType {
  name: string;
  mapbox_id: string;
  place_formatted: string;
}
interface SearchResultsGeocode {
  center: number[]; // [ 106.9177016, 47.9184676 ]
  place_name: string; //Ulaanbaatar, Mongolia
  id: string;
  text: string; //Ulaanbaatar
}

type RentalDataType = {
  id: string;
  dateRent: string;
  dateReturn: string;
  totalDays: number;
  location: string;
  verified: boolean;
  createdAt: number;
  extras: {
    coverage: boolean;
    child_safety: boolean;
    GPS: boolean;
  };
  car: CarType;
};

type OwnCarsType = {
  id: string;
  image: string;
  type: string;
  typeDefinition: string;
  model: string;
  transmission: string;
  kml: number;
  passengers: number;
  price: number;
  // checked: boolean;
};

type OwnCarType = {
  id: string;
  image: string;
  type: string;
  typeDefinition: string;
  model: string;
  transmission: string;
  kml: number;
  passengers: number;
  price: number;
};

type LanguageType = {
  id: string;
  textId: string;
  lang: string;
  value: string;
};
