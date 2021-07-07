import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loggedIn } from '../../redux/shoppingCart/shoppingCartActions';
import FieldLevelValidationForm from './form'
import { reset } from 'redux-form'


const mapDispatchToProps = dispatch => {
    return {
        loggedIn: (payload) => dispatch(loggedIn(payload))
    }
}
const mapStateToProps = state => {
    return {
        state
    }
}

function LogIn(props) {
    const { history, loggedIn, clear, reset } = props;
    const [emailError, setEmailError] = useState();
    const [passwordError, setPasswordError] = useState();

    const handleSubmit = (e) => {
        e.preventDefault()
        const { password, email } = props.state.form.loginForm.values ? props.state.form.loginForm.values : { email: undefined, password: undefined }
        if (email && password) {
            let id = JSON.parse(localStorage.getItem(email));
            if (id) {
                setEmailError('')
                if (password === id.password) {
                    setPasswordError('')
                    sessionStorage.setItem('isLoggedIn', true);
                    history.push({
                        pathname: '/product',
                        email
                    })
                    loggedIn(email)
                }
                else setPasswordError('invalid password')
            }
            else setEmailError('user doesnt exist')
        }
        else{
            if(!email) setEmailError('email is required')
            if(!password) setPasswordError('password is required')
        }
    }

    return (
        <React.Fragment>
            <div className="login-container">
                <div className="login-container-text">
                    <h2>Login</h2>
                    <p>Get access to your Orders, wishlist, and Recomendations</p>
                </div>
                <div className="login-form">
                    <FieldLevelValidationForm form={'loginForm'} emailId password emailError={emailError} passwordError={passwordError} handleSubmit={handleSubmit} />
                </div>
            </div>
            <footer className="footer">
                <p>Copyrigth &copy; 2011-2018 Sabka Bazar Groceries Supplies Pvt Ltd</p>
            </footer>

        </React.Fragment>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(LogIn)