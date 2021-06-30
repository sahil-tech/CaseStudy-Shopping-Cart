import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'


function SignUp() {
    const history = useHistory();
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [nameError, setNameError] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [passwordError, setPasswordError] = useState();
    const [emailError, setEmailError] = useState();
    const [confirmPasswordError, setConfirmPasswordError] = useState();
    const passwordFormat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
    const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const register = (e) => {
        e.preventDefault();
        setNameError('');
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');
        if (name && email && password && confirmPassword) {
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
                                'name': name,
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
            if (!name) {
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
    const validate = (e) =>{
        console.log(e.target.id)
        switch(e.target.id){
            case 'firstName' : {
                if(!name){
                    setNameError('please enter your name')
                }
                else{
                    setNameError('')
                }
                break;
            }
            case 'email' : {
                if(email){
                    if (!emailFormat.test(email)) {
                        setEmailError('Please enter valid email')
                    }
                    else{
                        setEmailError('')
                    }
                }
                else{
                    setEmailError('please enter your email')
                }
                break;
            }
            case 'password' : {
                if(password){
                    if (!passwordFormat.test(password)) {
                        setPasswordError('password requirements not matched')
                    }
                    else{
                        setPasswordError('')
                    }
                }
                else{
                    setPasswordError('please enter your password')
                }
                break;
            }
            case 'confirmPassword' : {
                if(confirmPassword){
                    if(password !== confirmPassword) {
                        setConfirmPasswordError('passwords doesnt match')
                    }
                    else{
                        setConfirmPasswordError('')
                    }
                }
                else{
                    setConfirmPasswordError('please confirm your password')
                }
                break;
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
                <form class="login-form" onSubmit={register}>
                    <div className="login-fields">
                        <label for="firstName">First Name</label>
                        <input id="firstName" type="text" onBlur={validate} onChange={(e) => setName(e.target.value)} />
                        {nameError && <p className="error-message">{nameError}</p>}
                    </div>
                    <div className="login-fields">
                        <label for="lastName">Last Name</label>
                        <input id="lastName" type="text" />
                    </div>
                    <div className="login-fields">
                        <label for="email">Email</label>
                        <input id="email" type="email" onBlur={validate} onChange={(e) => setEmail(e.target.value)} />
                        {emailError && <p className="error-message">{emailError}</p>}
                    </div>
                    <div className="login-fields">
                        <label for="password">Password</label>
                        <input id="password" type="password" onBlur={validate} onChange={(e) => setPassword(e.target.value)} />
                        {passwordError && <p className="error-message">{passwordError}</p>}
                    </div>
                    <div className="login-fields">
                        <label for="confirmPassword">Confirm Password </label>
                        <input id="confirmPassword" type="password" onBlur={validate} onChange={(e) => setConfirmPassword(e.target.value)} />
                        {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
                    </div>
                    <button className="login-button" type="submit" >Signup</button>
                </form>
            </div>
            <div className="footer">
                <p>Copyrigth &copy; 2011-2018 Sabka Bazar Groceries Supplies Pvt Ltd</p>
            </div>
        </React.Fragment>
    )
}
export default SignUp