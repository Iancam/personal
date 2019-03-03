import { dtToJSX } from "./components/resumeTypes";

export function getForDataType(
  dataType: dtToJSX,
  presentation: string,
  type: string
) {
  return dataType[presentation][type] || dataType[presentation].default;
}

export function titular(s: string) {
  return <span className="titular big-text"> {s} </span>;
}
