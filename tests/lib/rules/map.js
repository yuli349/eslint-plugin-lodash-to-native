let rule = require("../../../lib/rules/map");
const RuleTester = require("eslint").RuleTester;

function sum(a, b) {
    return a + b;
}

let ruleTester = new RuleTester();
ruleTester.run("map", rule, {
    valid: [
        {
            code: `[1, 2, 3].map(${sum})`
        },
    ],
    invalid: [
        {
            code: `_.map([1, 2, 3], ${sum})`,
            errors: [
                {
                    messageId: "avoidName"
                }
            ],
            output: `[1, 2, 3].map(${sum})`
        }
    ]
});