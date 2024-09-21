export interface ICard {
  airlineLogo: string | null;
  airlineName: string | null;
  airlineCode: string | null;
  flightNumber: string;
  deptDate: string;
  arrivalDate: string;
  departureAirportCode: string;
  arrivalAirportCode: string;
  stops: number;
  price: number;
}
