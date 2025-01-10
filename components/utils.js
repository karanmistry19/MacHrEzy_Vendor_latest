import moment from "moment";

export const getDate = (id) => {
  let timestamp = id?.toString().substring(0, 8);
  let date = new Date(parseInt(timestamp, 16) * 1000);
  return date;
};

export const formatDate = (date, format = "DD/MM/yyyy") => {
  return moment(date, format).format(format);
};

export const formatDateNew = (
  date,
  oldFormat = "YYYY-MM-DDTHH:mm:ss",
  newFormat = "DD/MM/YYYY HH:mm"
) => {
  return moment(date, oldFormat).format(newFormat);
};
