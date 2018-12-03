import React from 'react';
import { InputGroupAddon, FormFeedback } from 'reactstrap';
  

const renderWithoutAddon = props => (
    <React.Fragment>
        <input
            className={"form-control" + (props.error === null ? "" : " is-" + (props.error.length > 0 ? "invalid" : "valid"))}
            name={props.name}
            id={props.id ? props.id : props.name}
            type={props.type}
            value={props.value}
            onChange={props.onChange}
            required={props.required}
            //{...props}
        />
        <FormFeedback valid={props.error === ""} className="order-1">{props.error}</FormFeedback>
    </React.Fragment>
)

const renderWithAddon = props => (
    <div className="input-group">
        {props.addonType === "append" ? renderWithoutAddon(props) : null}
        <InputGroupAddon addonType={props.addonType}>{props.addon}</InputGroupAddon>
        {props.addonType === "prepend" ? renderWithoutAddon(props) : null}
    </div>
)

const Input = props => (
    <div className="form-group">
        <label htmlFor={props.name} className="form-label">{props.label}</label>
        {props.addon && props.addonType ? renderWithAddon(props) : renderWithoutAddon(props) }
    </div>
)

export default Input;