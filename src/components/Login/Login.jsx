import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import auth from '../../firebase.init';
import { Link } from 'react-router-dom';

const Login = () => {

    
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const mailRef = useRef();

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        setErrorMessage('');
        setSuccess(false);

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                if(!result.user.emailVerified){
                    setErrorMessage("Please verify your email")
                }
                else(
                    setSuccess(true)
                )
            })
            .catch(error => {
                console.log('ERROR', error);
                setSuccess(false);
                setErrorMessage(error.message);
            })
    }

    const handleForget = () =>{
        const email = mailRef.current.value;
        if(!email){
            console.log("Please provide a valid email")
        }
        else{
            sendPasswordResetEmail(auth, email)
            .then(()=>{
                alert("reset pass email send, check email")
            })
        }
    }

    return (
        <div className='mx-auto'>
            <div className='max-w-md mx-auto'>
                <h2 className='text-2xl pl-10 pt-5'>Log In</h2>
                <div className="card w-full max-w-sm shrink-0 shadow-2xl mx-auto mt-6 pb-6 bg-base-100">
                    <form className="card-body " onSubmit={handleLogin}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input ref={mailRef} type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label onClick={handleForget} className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <h2 className='mx-auto'>Already have an account <Link to='/register' className='font-semibold ml-2'>Sign In</Link></h2>
                </div>
            {
                errorMessage && <h4 className='text-red-400 mx-auto'>{errorMessage}</h4>
            }
            {
                success && <h4 className='text-green-400 mx-auto'>Successfully Log in</h4>
            }
            </div>
        </div>

    );
};

export default Login;