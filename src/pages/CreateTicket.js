import { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
/*
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
*/
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
//import { v4 as uuidv4 } from 'uuid'
//import Spinner from '../components/Spinner'

import './profile.css';
import './tickets.css';

function CreateTicket() {
  // eslint-disable-next-line
  //const [geolocationEnabled, setGeolocationEnabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    creator: 1,
    date: 1,
    access: false,
    urgent: false,
    address: '',
  })

  const {
    type,
    name,
    openedBy,
    dateAndTime,
    access,
    urgent,
    address,
  } = formData

  const auth = getAuth()
  const navigate = useNavigate()
  const isMounted = useRef(true)

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid })
        } else {
          navigate('/signIn')
        }
      })
    }

    return () => {
      isMounted.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isMounted])

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
  const formDataCopy = {
     ...formData,
     //geolocation,
     timestamp: serverTimestamp(),
  }
    
  formDataCopy.description = address
  
  delete formDataCopy.address
  // !formDataCopy.offer && delete formDataCopy.discountedPrice

  const docRef = await addDoc(collection(db, 'listings'), formDataCopy)
  setLoading(false)
  toast.success('New Ticket saved!')
  navigate(`/Tickets`)
}

const onMutate = (e) => {
  let boolean = null

  if (e.target.value === 'true') {
    boolean = true
  }
  if (e.target.value === 'false') {
    boolean = false
  }

  // Files
  if (e.target.files) {
    setFormData((prevState) => ({
      ...prevState,
      images: e.target.files,
    }))
  }

  // Text/Booleans/Numbers
  if (!e.target.files) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: boolean ?? e.target.value,
    }))
  }
}

if (loading) {
  return 
}

  return (
    <div className='profile'>
      <header>
        <p className='pageHeader profile-title'>Create new support ticket</p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <label className='formLabel'>Office / Remote</label>
          <div className='formButtons'>
            <button
              type='button'
              className={type === 'office' ? 'formButtonActive' : 'formButton'}
              id='type'
              value='Office'
              onClick={onMutate}
            >
              Office
            </button>
            <button
              type='button'
              className={type === 'remote' ? 'formButtonActive' : 'formButton'}
              id='type'
              value='remote'
              onClick={onMutate}
            >
              Remote
            </button>
          </div>

          <label className='formLabel'>Ticket title</label>
          <input
            className='formInputName'
            type='text'
            id='name'
            value={name}
            onChange={onMutate}
            maxLength='32'
            minLength='10'
            required
          />
          
          <div className='details'>
            <div>
              <label className='formLabel'>Opened by</label>
              <input
                className='formInputSmall'
                type='text'
                id='creator'
                value={openedBy}
                onChange={onMutate}
                required
              />
            </div>
            
            <div>
              <label className='formLabel'>Date & time</label>
              <input
                className='formInputSmall'
                type='date'
                id='date'
                value={dateAndTime}
                onChange={onMutate}
                required
              />
            </div>
          </div>
          <hr className='formLine' />
          <label className='formLabel'>Do you have access to your workstation?</label>
          <div className='formButtons'>
            <button
              className={access ? 'formButtonActive' : 'formButton'}
              type='button'
              id='access'
              value={true}
              onClick={onMutate}
              
            >
              Yes
            </button>
            <button
              className={
                !access && access !== null ? 'formButtonActive' : 'formButton'
              }
              type='button'
              id='access'
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>
          
          <label className='formLabel'>Is the problem urgent?</label>
          <div className='formButtons'>
            <button
              className={urgent ? 'formButtonActive' : 'formButton'}
              type='button'
              id='urgent'
              value={true}
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              className={
                !urgent && urgent !== null
                  ? 'formButtonActive'
                  : 'formButton'
              }
              type='button'
              id='urgent'
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>
          <hr className='formLine' />
          <label className='formLabel'>Please provide detailed description of your problem:</label>
          <textarea
            className='formMessage'
            type='text'
            id='address'
            value={address}
            onChange={onMutate}
            required
            rows="15" cols="45"
          />
    
          

         

          
          <button type='submit' className='changePersonalDetails' style={{marginLeft: "110px"}}>
            Create New Ticket
          </button>
        </form>
      </main>
    </div>
  )
}

export default CreateTicket
