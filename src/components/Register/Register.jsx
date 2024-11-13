import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import auth from '../../firebase.init';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Register = () => {

    const [success, setSuccess] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');

    const [showPass, setShowPass] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const pass = e.target.password.value;
        const terms = e.target.terms.checked;
        const name = e.target.name.value;
        const photo = e.target.photo.value;


        setErrorMessage('');
        setSuccess(false);

        if (!terms) {
            setErrorMessage("Please accept terms and conditions");
            return;
        }

        if (pass.length < 6) {
            setErrorMessage('Password should be at least 6 characters');
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(pass)) {
            setErrorMessage('Password should have atleast one uppercase, one lower case, one digit and one special character')
            return;
        }

        createUserWithEmailAndPassword(auth, email, pass)
            .then(result => {
                console.log(result.user);
                setSuccess(true);

                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        console.log('email verification send')
                    })

                const profile = {
                    displayName: name,
                    photoURL: photo,
                }

                updateProfile(auth.currentUser, profile)
                    .then(() => {
                        console.log("profile updated")
                    })
                    .catch(error => console.log("profile updated error"))

            })
            .catch(error => {
                console.log('ERROR', error);
                setErrorMessage(error.message);
                setSuccess(false);
            })
    }
    return (
        <div className='max-w-md mx-auto'>
            <h2 className='text-2xl my-8'>Register</h2>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <form className="card-body" onSubmit={handleSubmit}>
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" name="name" placeholder="name" className="input input-bordered" required />
                    <label className="label">
                        <span className="label-text">Photo URL</span>
                    </label>
                    <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered" required />
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type={showPass ? 'text' : 'password'} name='password' placeholder="password" className="input input-bordered  relative" required />
                    <button onClick={() => setShowPass(!showPass)} className='absolute left-80 top-96'>
                        {
                            showPass ? <FaEyeSlash /> : <FaEye />
                        }
                    </button>
                    <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                            <input type="checkbox" name='terms' className="checkbox mr-4" />
                            <span className="label-text">Accept terms and conditions</span>
                        </label>
                    </div>
                    <button className="btn btn-primary">Register</button>
                    <h2 className='mx-auto mt-4'>Already have an account <Link to='/login' className='font-semibold ml-2'>Log In</Link></h2>
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