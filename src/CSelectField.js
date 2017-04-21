import {Result, validateRules} from './util';

import React from 'react';
import SelectField from 'material-ui/SelectField';

export default class CSelectField extends React.Component {
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

    handleChange (event, index, value) {

        if (this.props.rules) {

            const result = validateRules(this.props.rules, value);

            this._validResult = new Result(result.isValid, result.value);

        }
        /* eslint no-trailing-spaces: "warn"*/
        this.props.onChange(
            this.props.name, 
            value, 
            this._validResult,
            event,
            index
            );

    }
    render () {
 
        const rest = Object.assign({}, this.props);

        delete rest.rules;
        delete rest.replaceValid;

        return (<SelectField {...rest} 
            errorText={
                typeof this.props.errorText === 'undefined' 
                ? this._validResult.value : this.props.errorText
            } 
            onChange={this.handleChange} 
                />);

    }

}
/* eslint react/require-default-props: "warn"*/
CSelectField.propTypes = {
    'errorText': React.PropTypes.string,
    'name': React.PropTypes.string.isRequired,
    'onChange': React.PropTypes.func.isRequired,
    'replaceValid': React.PropTypes.func,
    'rules': React.PropTypes.string
};
