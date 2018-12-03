import React from "react";

const Button = props => {
    return (
        <button
            type={props.type}
            style={props.style}
            onClick={props.onClick}
            {...props}
        >
            {props.title}
        </button>
    );
};

export default Button;