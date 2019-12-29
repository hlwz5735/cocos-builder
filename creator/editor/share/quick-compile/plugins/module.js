const e = require("fire-fs"),
  r = require("fire-path"),
  n = require("esprima"),
  o = (require("estraverse"), require("escodegen")),
  i = require("convert-source-map"),
  t = require("merge-source-map"),
  u =
    "undefined" != typeof Editor
      ? Editor.url(
          "unpack://editor/share/quick-compile/plugins/__quick_compile__.js"
        )
      : r.join(__dirname, "__quick_compile__.js"),
  s = e.readFileSync(u, "utf8");
module.exports = function(u) {
  let c = function(e, n, o) {
      let i;
      return (i = u.transformPath
        ? u.transformPath(e, n, o)
        : r.relative(o.out, n)).replace(/\\/g, "/");
    },
    _ = u.excludes || [];
  return (
    (_ = _.map(e => e.replace(/\\/g, "/"))),
    {
      nodeModule: !0,
      transform(e, s) {
        let { src: _, dst: d, ast: l, source: p } = e,
          a = `\n                (function() {\n                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';\n                    var __module = nodeEnv ? module : {exports:{}};\n                    var __filename = '${c(
            _,
            d,
            s
          )}';\n                    var __require = nodeEnv ? function (request) {\n                        return require(request);\n                    } : function (request) {\n                        return __quick_compile__.require(request, __filename);\n                    };\n                    function __define (exports, require, module) {\n                        if (!nodeEnv) {__quick_compile__.registerModule(__filename, module);}`,
          m =
            "\n                    }\n                    if (nodeEnv) {\n                        __define(__module.exports, __require, __module);\n                    }\n                    else {\n                        __quick_compile__.registerModuleFunc(__filename, function () {\n                            __define(__module.exports, __require, __module);\n                        });\n                    }\n                })();";
        ".json" === r.extname(_) && (p = "module.exports = " + p);
        let f = !0;
        if (
          (u.exludesForSourceMap &&
            u.exludesForSourceMap.includes(_) &&
            (f = !1),
          f)
        ) {
          l = l || n.parseScript(p, { loc: !0 });
          let r = n.parseScript(a + m, { loc: !0 });
          r.body[0].expression.callee.body.body[4].body.body.splice(1, 0, l);
          let u = o.generate(r, {
              sourceMap: _,
              sourceMapWithCode: !0,
              sourceContent: p
            }),
            s = i.fromSource(p),
            c = s && s.toObject(),
            d = JSON.parse(u.map.toString()),
            f = t(c, d),
            q = i.fromObject(f).toComment();
          (p = u.code + "\n" + q), (e.ast = r);
        } else p = a + p + m;
        e.source = p;
      },
      compileFinished(n, o) {
        let i = n.getSortedScripts(),
          t = (i = i.filter(e => -1 === _.indexOf(e.src))).map(e => {
            let r = {};
            for (let n in e.deps)
              r[n] = i.findIndex(function(r) {
                return r.src === e.deps[n];
              });
            return {
              mtime: n._mtimes[e.src],
              deps: r,
              path: c(e.src, e.dst, n)
            };
          }),
          u = n.entries.map(e => c(e, n.getDstPath(e), n)),
          d = (function(e, r) {
            return `\n(function () {\nvar scripts = ${e};\nvar entries = ${r};\n\n${s}\n})();\n    `;
          })(JSON.stringify(t), JSON.stringify(u));
        e.writeFileSync(r.join(n.out, "__quick_compile__.js"), d), o();
      }
    }
  );
};
