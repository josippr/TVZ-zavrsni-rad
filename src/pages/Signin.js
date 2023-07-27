
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
//import OAuth from '../components/OAuth'

import OAuth from '../components/OAuth';


import './SignIn.css';

function SignIn() {

    const [showPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const { email, password } = formData

    const navigate = useNavigate()

    const onChange = (e) => {
        setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
        const auth = getAuth()

        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        )

        if (userCredential.user) {
            navigate('/')
        }
        } catch (error) {
        toast.error('Wrong email or password!')
        }
    }

    return (
        <div className='signIn-container'>
            <div className='signIn-form'>
                <form onSubmit={onSubmit}>
                <h1>Welcome back!</h1>
                    <input 
                        type='email' 
                        className='emailInput' 
                        placeholder='Email' 
                        id='email' 
                        value={email} 
                        onChange={onChange} 
                    />
                    <input 
                        className='passwordInput'
                        type={showPassword ? 'text' : 'password'}
        	            placeholder='password'
                        id='password'
                        value={password} 
                        onChange = {onChange}
                    />
                    <br />
                    <button className='signInBtn'>Sign In <i className="fa-solid fa-arrow-right"></i></button>
                    <Link to='/forgotPassword' className='forgot-password'>Forgot Password?</Link>
                </form>
                <Link to='/signUp' className='sign-up'>Register Instead</Link>
                {/* Google OAuth component */}
                <OAuth />
            </div>
        </div>
    )
}

export default SignIn;