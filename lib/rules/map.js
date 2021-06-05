module.exports = {
    meta: {
        messages: {
            avoidName: "Avoid using variables named '{{ name }}'"
        },
        fixable: 'code'
    },
    create(context) {
        const sourceCode = context.getSourceCode();
        return {
            CallExpression(node) {
                const {arguments, callee} = node;
                const collection = sourceCode.getText(arguments[0]);
                const fn = sourceCode.getText(arguments[1]);
                if (callee.property.name === 'map' && callee.object.name === '_') {
                    const result = `${collection}.map(${fn})`;

                    if (node.arguments[0].type === 'ArrayExpression') {
                        context.report({
                            node,
                            messageId: "avoidName",
                            fix: function (fixer) {
                                return fixer.replaceText(node, result);
                            }
                        });
                    } else if (node.arguments[0].type !== 'ObjectExpression') {
                        context.report({
                            node,
                            messageId: "avoidName",
                            fix: function (fixer) {
                                return fixer.replaceText(node, Array.isArray(`${collection}`) ? result : _.map(collection, fn));
                            }
                        });
                    }
                }
            },
        };
    }
};