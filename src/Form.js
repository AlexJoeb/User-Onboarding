import React, { useState, useEffect } from "react";

import * as yup from "yup";
import { tsExpressionWithTypeArguments } from "@babel/types";

let schema = yup.object().shape({
    first_name: yup.string().required("Please enter your first name."),
    last_name: yup.string().required("Please enter your last name."),
    email: yup
        .string()
        .email("Please enter a valid e-mail.")
        .required("Please enter your e-mail."),
    password: yup.string().required("Please enter a password."),
    tos: yup.boolean().oneOf([true], "Please agree to the terms of service.")
});

export default ({ users, addUser }) => {
    const [state, setState] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        tos: false
    });

    const [errors, setErrors] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        tos: ""
    });

    const [disableSubmit, setDisableSubmit] = useState(true);

    useEffect(() => {
        schema.isValid(state).then(valid => {
            setDisableSubmit(!valid);
        });
    }, [state]);

    const onSubmit = event => {
        event.preventDefault();
        const id = getCustomID();
        addUser({
            id,
            first_name: state.first_name,
            last_name: state.last_name,
            email: state.email
        })
    };

    const getCustomID = () => {
        const id = Math.floor(Math.random() * 200);
        return users.filter(item => item.id === id).length ? getCustomID() : id;
    }

    const validateChange = event => {
        const { target } = event;
        const { name } = target;
        const value = target.name === "tos" ? target.checked : target.value;
        yup.reach(schema, name)
            .validate(value)
            .then(valid => {
                if(name === 'email'){
                    users.filter(item => {
                        if(item.email === value) throw new ValidationError("This e-mail is already taken.", ["This e-mail is already taken."]);
                    })
                }

                setErrors({
                    ...errors,
                    [name]: ""
                });
            })
            .catch(err => {
                setErrors({
                    ...errors,
                    [name]: err.message
                });
            });
    };

    const handleChange = event => {
        event.persist();
        const { target } = event;
        const { name } = target;
        const value = target.name === "tos" ? target.checked : target.value;
        const newFormData = {
            ...state,
            [name]: value
        };
        validateChange(event);
        setState(newFormData);
    };

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="first_name">
                What is your first name?
                <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    value={state.name}
                    onChange={handleChange}
                    autoComplete="off"
                />
                {errors.first_name.length > 0 ? (
                    <span className="error">{errors.name}</span>
                    ) : null}
            </label>
                <label htmlFor="last_name">
                    What is your last name?
                    <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        value={state.name}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                    {errors.last_name.length > 0 ? (
                        <span className="error">{errors.name}</span>
                        ) : null}
                </label>
            <label htmlFor="email">
                What would you like your e-mail to be?
                <input
                    type="text"
                    name="email"
                    id="email"
                    value={state.email}
                    onChange={handleChange}
                    autoComplete="off"
                />
                {errors.email.length > 0 ? (
                    <span className="error">{errors.email}</span>
                    ) : null}
            </label>
            <label htmlFor="password">
                What is your password?
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={state.password}
                    onChange={handleChange}
                    autoComplete="off"
                />
                {errors.password.length > 0 ? (
                    <span className="error">{errors.password}</span>
                    ) : null}
            </label>
            <label htmlFor="tos">
                Do you agree to the terms of service?
                <input
                    type="checkbox"
                    name="tos"
                    id="tos"
                    checked={state.tos}
                    onChange={handleChange}
                />
                {errors.tos.length > 0 ? (
                    <span className="error">{errors.tos}</span>
                    ) : null}
            </label>
            <button disabled={disableSubmit} type='submit'>
                Get started.
            </button>
        </form>
    );
};

class ValidationError extends Error {
    constructor(message, errors) {
      super(message); // (1)
      this.name = "ValidationError"; // (2)
      this.errors = [...errors];
    }
  }