import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContexts';
import './Signup.css';

const Signup = () => {

    const [error, setError] = useState(null);
    const {createUser} = useContext(AuthContext);

    const handleSubmit = (event) =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;

        if(password.length < 6) {
            setError("Password Should be  6 character or more");
            return;
        }
        
        if(password !== confirm){
            setError("Your Password didn't match");
            return;
        }
        createUser(email, password)
        .then(result =>{
            const user = result.user; 
            console.log(user);
            form.reset();
        })
        .catch(error => {
            console.error(error);
        })
    }

    return (
        <div className='form-container'>
            <h1 className='form-title'>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="" placeholder='Your email' required />
                </div>
                <div className="form-control mar-t">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="" placeholder='Your password' required />
                </div>
                <div className="form-control mar-t">
                    <label htmlFor="confirm">Confirm Password:</label>
                    <input type="password" name="confirm" id="" placeholder='Confirm password' required />
                </div>
                <p className='text-error'>{error? error: '' }</p>
                <input className='btn-submit mar-t2' type="submit" value="Sign Up" />
            </form>
            <p className='new-account-text'>Already have an account? <Link className="link-text" to='/login'>Login</Link></p>
        </div>
    );
};

export default Signup;