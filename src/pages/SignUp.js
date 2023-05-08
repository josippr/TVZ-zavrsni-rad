
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
//import firebase from 'firebase/compat/app';

import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {db} from '../firebase.config.js';
import {setDoc, doc, serverTimestamp} from 'firebase/firestore';

import { toast } from 'react-toastify'


import './SignIn.css';

function SignUp() {

    const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const { name, email, password } = formData

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

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: name,
      })

      const formDataCopy = { ...formData }
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')
    } catch (error) {
      toast.error('Something went wrong with registration')
    }
    }

    return (
        <div className='signIn-container'>
            <div className='signIn-form'>
                <form onSubmit={onSubmit}>
                <h1>Sign Up</h1>
                    <input 
                        type='text' 
                        className='textInput' 
                        placeholder='Name' 
                        id='name' 
                        value={name} 
                        onChange={onChange} 
                    />
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
                    <button className='signInBtn'>Sign Up <i className="fa-solid fa-arrow-right"></i></button>
                    <Link to='/forgotPassword' className='forgot-password'>Forgot Password?</Link>
                    
                </form>
                {/* Google OAuth component */}
            </div>
        </div>
    )
}

export default SignUp;