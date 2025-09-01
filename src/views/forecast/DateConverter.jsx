import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

export default function DateConverter(date) {
  const myDate = new Date(date);
  return format(myDate, 'EEE,MMM d', { locale: enUS });
}
