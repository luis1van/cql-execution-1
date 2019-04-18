// Generated by CoffeeScript 1.12.7
(function() {
  var E, build, constructByName, functionExists, typeIsArray;

  E = require('./expressions');

  typeIsArray = require('../util/util').typeIsArray;

  module.exports.build = build = function(json) {
    var child;
    if (json == null) {
      return json;
    }
    if (typeIsArray(json)) {
      return (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = json.length; i < len; i++) {
          child = json[i];
          results.push(build(child));
        }
        return results;
      })();
    }
    if (json.type === "FunctionRef") {
      return new E.FunctionRef(json);
    } else if (json.type === "Literal") {
      return E.Literal.from(json);
    } else if (functionExists(json.type)) {
      return constructByName(json.type, json);
    } else {
      return null;
    }
  };

  functionExists = function(name) {
    return typeof E[name] === "function";
  };

  constructByName = function(name, json) {
    return new E[name](json);
  };

}).call(this);

//# sourceMappingURL=builder.js.map