import { dtToJSX } from "./components/resumeTypes";

export function getForDataType(
  dataType: dtToJSX,
  presentation: string,
  type: string
) {
  return dataType[presentation][type] || dataType[presentation].default;
}
