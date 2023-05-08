
import {getAuth} from 'firebase/auth';
import {useState, useEffect} from 'react';

function CurrentUser(){

    const [user, setUser] = useState(null)

    const auth = getAuth();
    useEffect(() => {
        setUser(auth.currentUser)
    },[])

    return user ? <p>{user.displayName}</p> : 'Not Logged In'
}

export default CurrentUser;