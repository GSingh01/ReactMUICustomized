import Result from './Result';
import Rules from './Rules';

/**
  * Validates a value by Rule passed in order
  * @param {string} rules - rules to validate against(e.g: "required|email").
  * @param {any} value - value to validate
  * @returns {Object} Object of Result class
*/
export default function validateRules (rules, value) {

    const valid = new Result(true);

    if (!rules) {

        return valid;

    }

    const ruleArray = rules.split('|');

    for (const rule of ruleArray) {

        if (!Rules[rule].rule(value)) {

            return new Result(false, Rules[rule].hint(value));

        }

    }

    return valid;

}