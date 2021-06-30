import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loggedIn } from '../redux/shoppingCart/shoppingCartActions';

const mapDispatchToProps = dispatch => {
    return {
        loggedIn: (payload) => dispatch(loggedIn(payload))
    }
}
function LogIn(props) {
    const passwordFormat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
    const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { history, loggedIn } = props;
    const [emailError, setEmailError] = useState();
    const [passwordError, setPasswordError] = useState();

    const validate = (e) => {
        switch (e.target.id) {
            case 'email': {
                if (email) {
                    if (!emailFormat.test(email)) {
                        setEmailError('Please enter valid email')
                    }
                    else {
                        setEmailError('')
                    }
                }
                else {
                    setEmailError('please enter your email')
                }
                break;
            }
            case 'password': {
                if (password) {
                    setPasswordError('')
                }
                else {
                    setPasswordError('please enter your password')
                }
                break;
            }

        }
    }
    const login = (e) => {
        e.preventDefault();
        if (email && password) {
            let id = JSON.parse(localStorage.getItem(email))
            if (id) {
                if (!emailFormat.test(email)) {
                    setEmailError('invalid email id')
                }
                else {
                    let id = JSON.parse(localStorage.getItem(email))
                    if (password !== id.password) {
                        setPasswordError('invalid password')
                    }
                    else {
                        sessionStorage.setItem('isLoggedIn', true);

                        history.push({
                            pathname: '/product',
                            email
                        })
                        loggedIn(email)
                    }
                }
            }
            else {
                setEmailError('invalid user');
            }
        }
        else {
            if (!email) {
                setEmailError('please enter email')
            }
            if (!password) {
                setPasswordError('please enter password')
            }
        }
    }

    return (
        <React.Fragment>
            <form onSubmit={login} className="login-container">
                <div className="login-container-text">
                    <h2>Login</h2>
                    <p>Get access to your Orders, wishlist, and Recomendations</p>
                </div>
                <div class="login-form">
                    <div className="login-fields">
                        <label for="email">Email</label>
                        <input type="email" id="email" onBlur={validate} onChange={(e) => setEmail(e.target.value)} />
                        {emailError && <p className="error-message">{emailError}</p>}
                    </div>
                    <div className="login-fields">
                        <label for="password">Password</label>
                        <input type="password" id="password" onBlur={validate} onChange={(e) => setPassword(e.target.value)} />
                        {passwordError && <p className="error-message">{passwordError}</p>}
                    </div>
                    <button className="login-button" type="submit" >LogIn</button>
                </div>
            </form>
            <div className="footer">
                <p>Copyrigth &copy; 2011-2018 Sabka Bazar Groceries Supplies Pvt Ltd</p>
            </div>
        </React.Fragment>
    )
}
export default connect(null, mapDispatchToProps)(LogIn)