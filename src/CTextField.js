import React, {Component, PropTypes} from 'react';
import {Result, validateRules} from './util';
import TextField from 'material-ui/TextField';


export default class CTextField extends Component {
    constructor (props) {

        super(props);
        this.handleChange = this.handleChange.bind(this);
        this._validResult = new Result(true);

    }

    componentWillUpdate (nextProps) {

        if (nextProps.replaceValid) {

            this._validResult = this.props.replaceValid();

        }

    }

    handleChange (event) {

        if (this.props.rules) {

            const result = validateRules(this.props.rules, event.target.value);

            this._validResult = new Result(result.isValid, result.value);

        }
        /* eslint no-trailing-spaces: "warn"*/
        this.props.onChange(
            event.target.name, 
            event.target.value, 
            this._validResult
            );

    }
    render () {

        const rest = Object.assign({}, this.props);

        delete rest.rules;
        delete rest.replaceValid;

        return (<TextField {...rest} 
            errorText={
                typeof this.props.errorText === 'undefined' 
                ? this._validResult.value : this.props.errorText
            } 
            onChange={this.handleChange} 
                />);

    }

}
/* eslint react/require-default-props: "warn"*/
CTextField.propTypes = {
    'errorText': PropTypes.string,
    'onChange': PropTypes.func.isRequired,
    'replaceValid': PropTypes.func,
    'rules': PropTypes.string
};
