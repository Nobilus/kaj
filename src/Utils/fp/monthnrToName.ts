const months: { [key: string]: string } = {
  "01": "JAN",
  "02": "FEB",
  "03": "MAR",
  "04": "APR",
  "05": "MEI",
  "06": "JUN",
  "07": "JUL",
  "08": "AUG",
  "09": "SEP",
  "10": "OKT",
  "11": "NOV",
  "12": "DEC",
};

export default (monthNr: string) => {
  return months[monthNr] ? months[monthNr] : "";
};
