import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'

import './profile.css';

function ForgotPassword() {
    const [email, setEmail] = useState('')

    const onChange = (e) => setEmail(e.target.value)

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
        const auth = getAuth()
        await sendPasswordResetEmail(auth, email)
        toast.success('Email was sent')
        } catch (error) {
        toast.error('Could not send reset email')
        }
    }
    return (
        <div className='forgot-password-container'>
            <div>
                <h1>Forgot Password</h1>
            </div>
            <main>
            <form onSubmit={onSubmit}>
            <input
                type='email'
                className='emailInput'
                placeholder='Email'
                id='email'
                value={email}
                onChange={onChange}
            />
           

            <div className='signInBar'>
                <button className='logout-btn'>
                    Send Reset Email!
                </button>
                <Link className='forgotPasswordLink' to='/signIn'>
                Sign In
                </Link>
            </div>
            </form>
        </main>
      </div>
    )
}

export default ForgotPassword;