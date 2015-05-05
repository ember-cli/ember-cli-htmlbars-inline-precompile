module.exports = function(compiler) {
  return function(babel) {
    var t = babel.types;

    return new babel.Transformer('htmlbars-inline-precompile', {
      ImportDeclaration: function(node, parent, scope, state) {
        // check if we are visiting an import statement like `import x from 'htmlbars-inline-precompile'`
        // TODO make module name configurable?
        if (t.isLiteral(node.source, { value: "htmlbars-inline-precompile" })) {

          // get the specifier from the statement
          var importName;
          node.specifiers.forEach(function(specifier) {
            if (t.isImportDefaultSpecifier(specifier)) {
              importName = specifier;
            }
          });

          // save import specifier so it can be used when evaluating if a
          // tagged template expression should be replaced with precompiled
          // version
          state.importSpecifier = importName.local.name;

          // finally remove the dummy import declaration, since the module
          // doesn't exist anyway
          this.remove();
        }
      },

      // visit all tagged template expressions, like hbs`template string`
      TaggedTemplateExpression: function(node, parent, scope, state) {
        if (t.isIdentifier(node.tag, { name: state.importSpecifier })) {
          var quasis = node.quasi.quasis;
          var template = quasis.map(function(quasi) {
            return quasi.value.cooked;
          }).join("");

          return "Ember.HTMLBars.template(" + compiler.precompile(template) + ")";
        }
      }
    });
  };
};
