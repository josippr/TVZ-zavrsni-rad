import {getAuth} from 'firebase/auth';
import {useState, useEffect} from 'react';

import './profile.css';

function Profile() {

    const [user, setUser] = useState(null)

    const auth = getAuth();
    useEffect(() => {
        setUser(auth.currentUser)
    },[])

    return user ? 
    <div className='profileContainer'>Logged In username: {user.displayName}
        <p className='profile-item'>E mail address: {user.email}</p>
        <p className='profile-item'>User in database: TRUE</p>
        <p className='profile-item'>User created manually: FALSE</p>
    </div> : 'Not Logged In'
}

export default Profile;