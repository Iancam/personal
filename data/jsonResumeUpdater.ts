import { readFileSync, writeFileSync } from "fs";
import { flatten, keyBy } from "lodash";
import {} from "prettier";
// import tp from "@atomist/tree-path";
// import { symbol } from "prop-types";
import { isArray } from "util";
// import resumeData from "(../static/resume.json)";

const [, ...updateStrings] = readFileSync("data/updatedResumeContent.txt")
  .toString()
  .split("\n\n");

const updates = keyBy(
  updateStrings
    .map(w => w.split("\n"))
    .map(([selector, ...highlights]) => ({ selector, highlights })),
  "selector"
);

const old = JSON.parse(readFileSync("static/resume.json").toString());
const searchSpaces = ["//projects", "//work"];

/**
 * uses keys as names, searching for names that match the given variable names
 * '//' searches recursively to the first key, and
 *  '/' searches only on the specified level
 */
type predicate = (object: object) => boolean;

function evalPath(
  searchPaths: string[],
  object: object,
  transform?: (t: object[]) => void
) {
  const search = (
    path: string[],
    object: object | undefined | any
  ): object | undefined => {
    if (!object) return undefined;
    if (path.length === 0) {
      isArray(object) && transform && transform(object);
      return [object];
    }

    const [symbol, variable, ...rest] = path;
    const keys = Object.keys(object);
    const keysMatched = keys.filter(k => k === variable);
    if (keysMatched.length > 0)
      return flatten(keysMatched.map(k => search(rest, object[k])));
    if (symbol === "//") return flatten(keys.map(k => search(path, object[k])));
  };

  const searcher = (pathString: string) => {
    const [, ...pathArr] = pathString.split(/(\/{1,2})/);

    return search(pathArr, object);
  };
  return flatten(searchPaths.map(searcher));
}

const merger = () => {
  let used: any[] = [];
  return (oldArr: any[]) => {
    oldArr.forEach((workItem, i) => {
      const name = workItem.position || workItem.title;
      const update = updates[name];
      if (update) workItem.highlights = update.highlights;
      used.push(name);
    });
    return used;
  };
};

const stuff = evalPath(searchSpaces, old, merger());

console.log(PrJSON.stringify(stuff));
