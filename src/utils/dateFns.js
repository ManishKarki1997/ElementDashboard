import { format } from "date-fns";

const formatDate = (date, formatString = "do LLL, yyyy") => {
  if (!date) return;

  return format(new Date(date), formatString);
};

export default { formatDate };
