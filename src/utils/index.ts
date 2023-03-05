import * as moment from 'moment';

export const parseDateToString = (date: Date) =>
  moment(date).format('DD/MM/YYYY HH:mm');
