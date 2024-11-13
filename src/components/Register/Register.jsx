import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import auth from '../../firebase.init';

const Register = () => {

    const [success, setSuccess] = useState(false);

    const [errorMessage,setErrorMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const pass = e.target.password.value;

        setErrorMessage('');
        setSuccess(false)

        if(pass.length < 6){
            setErrorMessage('Password should be at least 6 characters');
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if(!passwordRegex.test(pass)){
            setErrorMessage('Password should have atleast one uppercase, one lower case, one digit and one special character')
            return;
        }

        createUserWithEmailAndPassword(auth, email, pass)
        .then(result => {
            console.log(result.user);
            setSuccess(true);
        })
        .catch(error =>{
            console.log('ERROR', error);
            setErrorMessage(error.message);
            setSuccess(false);
        })
    }
    return (
        <div className='max-w-md mx-auto'>
            <h2 className='text-xl my-8'>Register</h2>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <form className="card-body" onSubmit={handleSubmit}>
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                    <button className="btn btn-primary">Login</button>
                </form>
            </div>
            {
                errorMessage && <h4 className='text-red-400'>{errorMessage}</h4>
            }
            {
                success && <h4 className='text-green-400'>Successfully submitted</h4>
            }
        </div>
    );
};

export default Register;