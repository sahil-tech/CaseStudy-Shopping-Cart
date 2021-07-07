import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import FieldLevelValidationForm from './form'
import {connect} from 'react-redux';

const mapStateToProps = state => {
    return {
        state
    }
}
const mapDispatchToProps = dispatch => {
    return{};
}
function SignUp(props) {
    const history = useHistory();
    const [nameError, setNameError] = useState();
    const [passwordError, setPasswordError] = useState();
    const [emailError, setEmailError] = useState();
    const [confirmPasswordError, setConfirmPasswordError] = useState();
    const passwordFormat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
    const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const handleSubmit = (e) => {
        e.preventDefault();
        setNameError('');
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');
        const {firstname,lastname, password, email, confirmPassword } = props.state.form.registrationForm.values ? props.state.form.registrationForm.values : {firstname:undefined, email:undefined,password:undefined,confirmPassword:undefined}
        if (firstname && email && password && confirmPassword) {
            if (!emailFormat.test(email)) {
                setEmailError('Please enter valid email id')
            }
            else {
                let id = localStorage.getItem(email)
                if (id) {
                    setEmailError('Please choose other email')
                }

                else {
                    if (!passwordFormat.test(password)) {
                        setPasswordError('password requirements not matched')
                    }

                    else {
                        if (password !== confirmPassword) {
                            setConfirmPasswordError('passwords doesnt match')
                        }
                        else {
                            let user = {
                                'email': email,
                                'name': firstname,
                                'password': password
                            }
                        
                            localStorage.setItem(email, JSON.stringify(user))
                            alert('registration successfull');
                            history.push('/login')
                        }
                    }
                }
            }
        }
        else {
            if (!firstname) {
                setNameError('Name is required');
            }
            if (!email) {
                setEmailError('Email is required')
            }
            if (!password) {
                setPasswordError('Password is required')
            }
            if (!confirmPassword) {
                setConfirmPasswordError('ConfirmPassword is required')
            }
        }
    }
    

    return (
        <React.Fragment>
            <div className="login-container">
                <div className="login-container-text">
                    <h2>Register</h2>
                    <p>We dont share your personal details with anyone</p>
                </div>
                <div className = "login-form">
                    <FieldLevelValidationForm nameError={nameError} emailError={emailError} passwordError={passwordError} confirmPasswordError={confirmPasswordError} form={'registrationForm'} handleSubmit = {handleSubmit} firstname lastname emailId password confirmPassword/>
                </div>
            </div>
            <div className="footer">
                <p>Copyrigth &copy; 2011-2018 Sabka Bazar Groceries Supplies Pvt Ltd</p>
            </div>
        </React.Fragment>
    )
}
export default connect(mapStateToProps,mapDispatchToProps)(SignUp)