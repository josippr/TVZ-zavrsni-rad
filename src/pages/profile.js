
// ako se logouta i vrati na profile page trenutno se prikazuje error, 
//što je ok jer se ubuduće neće moći doći do profile stranice ako user nije ulogiran

//required libraries
import {getAuth, updateProfile} from 'firebase/auth';
import {useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
    updateDoc,doc,
    collection,
    getDocs,
    query,
    where,
    orderBy,
    deleteDoc, 
} from 'firebase/firestore';
import { db } from '../firebase.config';
//form error msgs
import { toast } from 'react-toastify'


//css stylesheets
import './profile.css';
import './SignIn.css';

function Profile() {


    const auth = getAuth()
    const [loading, setLoading] = useState(true)
    const [listings, setListings] = useState(null)
    const [changeDetails, setChangeDetails] = useState(false)
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    })

    const { name, email } = formData

    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserListings = async () => {
        const listingsRef = collection(db, 'listings')

        const q = query(
            listingsRef,
            where('userRef', '==', auth.currentUser.uid),
            orderBy('timestamp', 'desc')
        )

        const querySnap = await getDocs(q)

        let listings = []

        querySnap.forEach((doc) => {
            return listings.push({
            id: doc.id,
            data: doc.data(),
            })
        })

        setListings(listings)
        setLoading(false)
        }

        fetchUserListings()
    }, [auth.currentUser.uid])

    const onLogout = () => {
        auth.signOut()
        navigate('/')
    }

    const onSubmit = async () => {
        try {
        if (auth.currentUser.displayName !== name) {
            // Update display name in fb
            await updateProfile(auth.currentUser, {
            displayName: name,
            })

            // Update in firestore
            const userRef = doc(db, 'users', auth.currentUser.uid)
            await updateDoc(userRef, {
            name,
            })
        }
        } catch (error) {
        console.log(error)
        toast.error('Could not update profile details')
        }
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
        }))
    }

    const onDelete = async (listingId) => {
        if (window.confirm('Are you sure you want to delete?')) {
        await deleteDoc(doc(db, 'listings', listingId))
        const updatedListings = listings.filter(
            (listing) => listing.id !== listingId
        )
        setListings(updatedListings)
        toast.success('Successfully deleted listing')
        }
    }

    const onEdit = (listingId) => navigate(`/edit-listing/${listingId}`)

    return (
        <div className='profile'>
        <header className='profileHeader'>
            <div className='profile-title'>My Profile</div>
            <button type='button' className='logout-btn' onClick={onLogout}>
            Logout
            </button>
        </header>

        <main className='main'>
            <div className='profileCard'>
            <form className='profile-form-container'>
                <p
                    className='changePersonalDetails'
                    onClick={() => {
                    changeDetails && onSubmit()
                    setChangeDetails((prevState) => !prevState)
                    }}
                    style={{paddingTop: "12px"}}
                >
                    {changeDetails ? 'Done' : 'Edit Profile'}
                </p> <br /><br />
                <div className='profile-item-wrapper'>
                    <div className='profile-item-title'>
                        Name
                    </div>
                    <div className='profile-item-desc'>
                        <p>This field is public, meaning other users will see it. Choose your name accordingly!</p>
                    </div>
                    <input
                    type='text'
                    id='name'
                    className={!changeDetails ? 'profileName' : 'profileNameActive'}
                    disabled={!changeDetails}
                    value={name}
                    onChange={onChange}
                    />
                </div>
                <div className='profile-item-wrapper'>
                    <div className='profile-item-title'>
                        Email
                    </div>
                    <div className='profile-item-desc'>
                        <p>This field is public, meaning other users will see it. This field cannot be changed.</p>
                    </div>
                    <input
                    type='email'
                    id='email'
                    className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
                    disabled={!changeDetails}
                    value={email}
                    onChange={onChange}
                    />
                </div>
                <div className='profile-item-wrapper'>
                <div className='profile-item-title'>
                        Password
                    </div>
                    <div className='profile-item-desc'>
                        <p>Your password is fully private. It is stored in encrypted format, so no one is able to see it. Privacy Policy</p>
                    </div>
                    <Link to='/forgotPassword' className='changePersonalDetails' style={{marginTop: "20px", paddingTop: "12px", textAlign: "center"}}>Forgot Password?</Link>
                </div>
            </form>
            </div>

            
        </main>
        </div>
    )
}

export default Profile;