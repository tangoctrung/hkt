import { Dayjs } from "dayjs";

let datePickerCache: [Dayjs, Dayjs] | null = null;
let label: string = "";
export const getDatePicker = () => {
  return datePickerCache;
};

export const setDatePicker = (data: [Dayjs, Dayjs]) => {
  datePickerCache = data;
};

export const getLabelDatePicker = () => {
  return label;
};

export const setLabelDatePicker = (data: string) => {
  label = data;
};
