import { IFilter } from 'src/models/filter.model';

export const initialFilter: IFilter = {
  maxValue: 0,
  minValue: 0,
  isRefundable: 'both',
  stops: -1,
  airline: null,
};
