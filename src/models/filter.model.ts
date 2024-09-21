export interface IFilter {
  maxValue: number;
  minValue: number;
  isRefundable: false | true | 'both';
  stops: number[];
  airline: null;
}
