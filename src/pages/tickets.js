import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, query, where, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import { doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

//import ListingItem from '../components/ListingItem';

function Ticket() {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const user = auth.currentUser;

        if (!user) {
          navigate('/sign-in');
          return;
        }

        let querySnapshot;

        // admin uid: ymenqyKBpCZnEQsCsTU8AVfneED2
        
        if (user.uid === 'ymenqyKBpCZnEQsCsTU8AVfneED2') {
          // Admin user, fetch all tickets
          querySnapshot = await getDocs(collection(db, 'listings'));
        } else {
          // Regular user, fetch their own tickets
          const listingsRef = collection(db, 'listings');
          const q = query(listingsRef, where('userRef', '==', user.uid));
          querySnapshot = await getDocs(q);
        }

        const listingData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        setListings(listingData);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, [auth, navigate]);

  const handleDelete = async (listingId) => {
    try {
      const user = auth.currentUser;

      if (user.uid === 'ymenqyKBpCZnEQsCsTU8AVfneED2') {
        // Admin user, delete the ticket directly
        await deleteDoc(doc(db, 'listings', listingId));
        toast.success('Ticket closed.');
      } else {
        // Regular user, check if the ticket belongs to the user before deleting
        const listingRef = doc(db, 'listings', listingId);
        const listingDoc = await getDoc(listingRef);

        if (listingDoc.exists() && listingDoc.data().userRef === user.uid) {
          await deleteDoc(listingRef);
          toast.success('Ticket closed.');
        } else {
          toast.error('You do not have permission to delete this ticket.');
          
          return;
        }
      }

      navigate(`/Tickets`);
    } catch (error) {
      toast.error('Could not delete ticket');
      console.log(error);
    }
  };

  return (
    <div className='profile'>
      <div className="ticket-container">
        <div className='new-ticket'>
          <h2>Create new support ticket:</h2>
          <Link to='/CreateTicket' className='ticket-link'>
            <div className="ticket-btn">Create New Ticket</div>
          </Link>
        </div>
        <hr className='line' />
        <main className='main'>
          <h1 className='main-h1'>Opened tickets</h1>
          <ul className='categoryListings'>
            {listings.map((listing) => (
              <div className='listingItem' key={listing.id}>
                {/* Render the data from each listing */}
                <h2>{listing.name}</h2>
                <p>{listing.description}</p>
                <p>
                  <p className='p-inline'>Urgent ticket: </p>
                  {listing.urgent ? (
                    <p className='p-inline' style={{ color: 'red' }}>True</p>
                  ) : (
                    <p className='p-inline' style={{ color: '#215291' }}>False</p>
                  )}
                </p>
                <p>
                  <p className='p-inline'>Type:</p> {listing.type}
                </p>
                <p>
                  <p className='p-inline'>Ticket opened by:</p> {listing.creator}
                </p>
                <button onClick={() => handleDelete(listing.id)} className='deleteBtn'>Close ticket</button>
              </div>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}

export default Ticket;
