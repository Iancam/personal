import { dtToJSX } from "./components/resumeTypes";

export function getForDataType(
  dataType: dtToJSX,
  presentation: string,
  type: string
) {
  return dataType[presentation][type] || dataType[presentation].default;
}

export function titular(s: string, extras: string) {
  const cname = "titular big-text " + (extras || "");
  return <span className={cname}> {s} </span>;
}
