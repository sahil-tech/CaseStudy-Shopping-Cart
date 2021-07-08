import React from 'react'
import { reset, Field, reduxForm } from 'redux-form'

const required = value => (value || typeof value === 'number' ? undefined : 'Required')
const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
export const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength2 = minLength(2)
const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined
const aol = value =>
    value && /.+@aol\.com/.test(value)
        ? 'Really? You still use AOL for your email?'
        : undefined
const alphaNumeric = value =>
    value && /[^a-zA-Z0-9 ]/i.test(value)
        ? 'Only alphanumeric characters'
        : undefined
const passwordFormat = value =>
    value && !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/.test(value)
        ? 'invalid password format'
        : undefined

const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
}) => (
    <div className="login-fields">
        <label>{label}</label>
        <input {...input} type={type} />
        {touched &&
            ((error && <span className="error-message">{error}</span>) ||
                (warning && <span className="error-message">{warning}</span>))}
    </div>
)
   
const FieldLevelValidationForm = props => {
    const { nameError,firstname, lastname, emailId, password, handleSubmit, emailError, passwordError, confirmPassword,confirmPasswordError } = props
    return (
        <form onSubmit={handleSubmit}>
            {firstname && <Field
                name="firstname"
                type="text"
                component={renderField}
                label="firstname"
                validate={[required, maxLength15, minLength2]}
                warn={alphaNumeric}
            />}
            {nameError && <span className="error-message">{nameError}</span>}
            {lastname && <Field
                name="lastname"
                type="text"
                component={renderField}
                label="lastname"
            />}
            {emailId && <Field
                name="email"
                type="email"
                component={renderField}
                label="Email"
                validate={[email, required]}
                warn={aol}
            />}
            {emailError && <span className="error-message">{emailError}</span>}
            {password && <Field
                name="password"
                type="password"
                component={renderField}
                label="Password"
                validate={[required, passwordFormat]}
                warn={aol}
            />}
            {passwordError && <span className="error-message">{passwordError}</span>}
            {confirmPassword && <Field
                name="confirmPassword"
                type="password"
                component={renderField}
                label="ConfirmPassword"
                validate={[required, passwordFormat]}
                warn={aol}
            />}
            {confirmPasswordError && <span className="error-message">{confirmPasswordError}</span>}
            <div>
                <button className="login-button" type="submit">
                    Submit
                </button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'fieldLevelValidation'
})(FieldLevelValidationForm)