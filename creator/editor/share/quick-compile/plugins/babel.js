const e = require("babel-core");
module.exports = function(r) {
  return {
    transform(s) {
      if (-1 !== s.src.indexOf(".json")) return;
      let o = "inline";
      (r = r || {}).exludesForSourceMap &&
        r.exludesForSourceMap.includes(s.src) &&
        (o = !1);
      let c = e.transform(s.source, {
        ast: !1,
        highlightCode: !1,
        sourceMaps: o,
        compact: !1,
        filename: s.src,
        presets: ["env"],
        plugins: [
          "transform-decorators-legacy",
          "transform-class-properties",
          "add-module-exports"
        ]
      });
      s.source = c.code;
    }
  };
};
