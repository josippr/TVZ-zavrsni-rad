
import {getAuth} from 'firebase/auth';
import {useState} from 'react';
//import Profile from '../pages/profile';

function CurrentUser(){

    const auth = getAuth();

    const [formData] = useState({
        //name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    })

    const { email } = formData

    return (
        <p>{email}</p>
    
    )
}

export default CurrentUser;