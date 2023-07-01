import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import { doc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

import ListingItem from '../components/ListingItem';

function Ticket() {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'listings'));
        const listingData = [];
        querySnapshot.forEach((doc) => {
          listingData.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setListings(listingData);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  const handleDelete = async (listingId) => {
    try {
      await deleteDoc(doc(db, 'listings', listingId));
      toast.success('Ticket closed.');
      navigate(`/Tickets`);
    } catch (error) {
      toast.error('Could not delete ticket');
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
