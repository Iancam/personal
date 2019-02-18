const { isString } = require("util");
const { groupsOf, toStyle } = require("./utilities");
function colorize(kulerColor) {
  return isString(kulerColor)
    ? kulerColor
    : `rgb(${kulerColor.map(c => c * 255).join(",")})`;
}

function getColors(url) {
  return new URL(url).searchParams.get("rgbvalues").split(",");
}

module.exports.toColorPalette = function(url) {
  return groupsOf(3, getColors(url));
};

module.exports.toDiv = function(
  kColor,
  idx,
  dims = { width: "150px", height: "150px" }
) {
  const styles = { "background-color": colorize(kColor), ...dims };
  return `<div style=${toStyle(styles)}>
    <p>${idx}</p>
  </div>`;
};
