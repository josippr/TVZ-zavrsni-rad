
import './home.css';

import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase.config';
import { getAuth } from 'firebase/auth';

function Explore() {

    const [ticketCount, setTicketCount] = useState(0);
    const[taskCount, setTaskCount] = useState(0);
    const [postCount, setPostCount] = useState(0);


    const auth = getAuth();

    useEffect(() => {
        const fetchTickets = async () => {
        try {
            const user = auth.currentUser;
            if (!user) {
            // User not logged in, handle this case if needed
            return;
            }

            const userId = user.uid;
            const listingsRef = collection(db, 'listings');
            const q = query(listingsRef, where('userRef', '==', userId));
            const querySnapshot = await getDocs(q);
            const count = querySnapshot.size;
            setTicketCount(count);
        } catch (error) {
            console.error('Error fetching tickets:', error);
        }
        };

        fetchTickets();
    }, [auth]);

    useEffect(() => {
        const fetchtasks = async () => {
        try {
            const user = auth.currentUser;
            if (!user) {
            // User not logged in, handle this case if needed
            return;
            }

            const userId = user.uid;
            const listingsRef = collection(db, 'workTasks');
            const q = query(listingsRef, where('userRef', '==', userId));
            const querySnapshot = await getDocs(q);
            const count = querySnapshot.size;
            setTaskCount(count);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
        };

        fetchtasks();
    }, [auth]);

    
    useEffect(() => {
        const fetchposts = async () => {
        try {
            const user = auth.currentUser;
            if (!user) {
            // User not logged in, handle this case if needed
            return;
            }

            const userId = user.uid;
            const listingsRef = collection(db, 'posts');
            const q = query(listingsRef, where('userRef', '==', userId));
            const querySnapshot = await getDocs(q);
            const count = querySnapshot.size;
            setTaskCount(count);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
        };

        fetchposts();
    }, [auth]);
    



    return (
        <div className="home">
            <h1>Home</h1>
            <div className='home-content'>
                <div className='home-icons'>
                    <div className='icon'>
                        <div className='tickets-number'>
                            {ticketCount}
                            <div className='tickets-title'>
                                Opened tickets
                            </div>
                        </div>
                    </div>
                    <div className='icon'>
                        <div className='tickets-number'>
                            {taskCount}
                            <div className='tickets-title'>
                                My work tasks
                            </div>
                        </div>
                    </div>
                    <div className='icon'>
                        <div className='tickets-number'>
                            {postCount}
                            <div className='tickets-title'>
                                My Social feed activity
                            </div>
                        </div>
                    </div>
                </div>
                <div className='home-features'>
                    <div className='tickets-title'>
                        Hello, UserRef
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Explore;