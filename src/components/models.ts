export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Hotels {
  id: number;
  favorite: boolean;
  name: string;
  description: string;
  stars: string;
  thumb: string;
  amenities: null;
  hasBreakFast: boolean;
  hasRefundableRoom: boolean;
  hasAgreement: boolean;
  nonRefundable: null;

  price: number;
}

export interface Places {
  name: string;
  state: {
    name: string;
    shortname: string;
  };
  placeId: number;
}

export interface Order {
  label: string;
  value: string;
}

interface Amenity {
  key: string;
  label: string;
}

interface Address {
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  country: string;
  zipCode: string | null;
  fullAddress: string;
}

export interface Hotel {
  id: number;
  favorite: boolean;
  name: string;
  description: string;
  stars: string;
  thumb: string;
  amenities: Amenity[];
  hasBreakFast: boolean;
  hasRefundableRoom: boolean;
  hasAgreement: boolean;
  nonRefundable: string | null;
  address: Address;
  images: string[];
  deals: null;
  roomsQuantity: number;
  price: number;
}

export interface Hotels {
  placeId: number;
  hotels: Hotel[] | [];
}

export const orders = [
  {
    label: 'Recomendados',
    value: 'recommended',
  },
  {
    label: 'Melhor Avaliados',
    value: 'best_rated',
  },
];
