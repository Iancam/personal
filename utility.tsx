import { dtToJSX } from "./src/components/resumeTypes";

export function getForDataType(
  dataType: dtToJSX,
  presentation: string,
  type: string
) {
  return dataType[presentation][type] || dataType[presentation].default;
}

export function titular(s: string, extras?: string) {
  const cname = "titular big-text " + (extras || "");
  return <span className={cname}> {s} </span>;
}

export function dateToMonthAndYear(date?: string, small = true) {
  if (!date) {
    return date;
  }
  var mL = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  var mS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];

  const [year, month] = date.split("-");

  return [(small ? mS : mL)[parseInt(month) - 1], year].join(" ");
}
