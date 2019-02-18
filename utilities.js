module.exports.groupsOf = function(num, list) {
  return list.reduce((agg, curr, i) => {
    if (i % num === 0) {
      return [[curr], ...agg];
    } else {
      const [cumm, ...rest] = agg;
      return [cumm.concat(curr), ...rest];
    }
  }, []);
};

module.exports.toList = function(items, handler, inline = true) {
  return `<ul ${inline ? 'style="display: inline;"' : ""}>${items
    .map((c, i) => `<li>${handler(c, i)}</li>`)
    .join("\n")}</ul>`;
};

module.exports.toStyle = function(obj) {
  return (
    '"' +
    [...Object.keys(obj).map(k => `${k}: ${obj[k]}`)]
      .map(s => s + "; ")
      .join("") +
    '"'
  );
};

module.exports.html5Wrap = content =>
  `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Document</title>
      </head>
      <body>` +
  content +
  `</body>
</html>`;
// (
// const range = end => {
//   var list = [];
//   for (var i = 0; i <= end; i++) {
//     list.push(i);
//   }
//   return list;
// };
