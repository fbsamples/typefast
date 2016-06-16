// Parses comments above variable declarations, function declarations,
// and object properties as docstrings and JSDoc-style type
// annotations.
var FBOptimise = (function(infer, walk) {
  var fieldsAccessed = {};

  function isEdge(node) {
      return node.types[0]
        && node.types[0].retval
        && node.types[0].retval.proto
        && node.types[0].retval.proto.name.indexOf('cursor') > -1;
  }

  function isCursor(node) {
    return node.types[0]
      && node.types[0].proto
      && node.types[0].proto.name.indexOf('cursor') > -1;
  }

  return {
    postInfer: function(ast, scope) {
      walk.simple(ast, {
        MemberExpression: function(node, scope) {
          fieldsAccessed = {};

          if (node.object.fbType === undefined){
            node.object.fbType = infer.expressionType({
              node: node.object,
              state: scope
            })
          }

          if (node.property.fbType === undefined) {
            node.property.fbType = infer.expressionType({
              node: node.property,
              state: scope
            })
          }

          var objFbType = node.object.fbType;
          name = node.property.name

          if (node.object.type == 'CallExpression') {
            if (objFbType.proto) {
              properties = objFbType.proto.props
              if (properties[name]) {
                if (!fieldsAccessed[objFbType.proto.name]) {
                  fieldsAccessed[objFbType.proto.name] = new Set();
                }
                fieldsAccessed[objFbType.proto.name].add(name)
              }
            }
          } else if (objFbType.propertyName
            && objFbType.types[0]
            && !isCursor(objFbType)) {
            var properties = objFbType.types[0].props || {};

            if(Object.keys(properties).length == 0) {
              if (objFbType.types[0].proto) {
                properties = objFbType.types[0].proto.props
              }
            }

            if (properties[name] // check its a valid prop
              && !isEdge(properties[name]) // check its not an edge
            ) {
              if (!fieldsAccessed[objFbType.types[0].proto.name]) {
                fieldsAccessed[objFbType.types[0].proto.name] = new Set();
              }
              fieldsAccessed[objFbType.types[0].proto.name].add(name)
            }
          }
          node.property.parent_object = node.object
        }
      }, infer.searchVisitor, scope);
      console.log(fieldsAccessed);
    },
    getFieldsAccessed: function() {
      return fieldsAccessed;
    },
    getURLSafeFieldsAccessed: function() {
      var obj = {};
      for(var key in fieldsAccessed) {
        if(fieldsAccessed.hasOwnProperty(key)) {
          obj[key] = Array.from(fieldsAccessed[key]);
        }
      }
      return obj;
    }
  }
})(tern, acorn.walk)
