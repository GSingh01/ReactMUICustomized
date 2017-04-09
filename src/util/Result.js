const _isValid = Symbol('isValid symbol for Result class');
const _value = Symbol('value symbol for Result class');

export default class Result {

    constructor (isValid, value) {

        this[_isValid] = isValid === true;
        this[_value] = typeof value === 'undefined' ? null : value;

    }

    get isValid () {

        return this[_isValid];

    }

    get value () {

        return this[_value];

    }

}