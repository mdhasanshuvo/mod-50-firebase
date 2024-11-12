import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import auth from '../../firebase.init';

const Register = () => {


    const [errorm,setErrorm] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const pass = e.target.password.value;

        setErrorm('');

        createUserWithEmailAndPassword(auth, email, pass)
        .then(result => {
            console.log(result.user)
        })
        .catch(error =>{
            console.log('ERROR', error);
            setErrorm(error.message);
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
                errorm && <h4>{errorm}</h4>
            }
        </div>
    );
};

export default Register;