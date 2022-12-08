import { format } from 'date-fns';

const formatDate = (saleDate) => {
  const date = new Date(saleDate);
  const formatedDate = format(date, 'dd/MM/yyyy');
  return formatedDate;
};

export default formatDate;
