import { Link } from 'react-router-dom';

function ListingItem({ listing, id }) {
  if (!listing || typeof listing !== 'object' || !listing.name) {
    // Handle the case where the listing or its properties are undefined
    return null;
  }

  const { name, creator, access, timestamp, type, urgent } = listing;

  return (
    <li className='categoryListing'>
      <div className='categoryListingDetails'>
        <p className='categoryListingName'>{listing.name}</p>
        <p className='categoryListingName'>{listing.creator}</p>
        <p className='categoryListingName'>{listing.access}</p>
        <p className='categoryListingName'>{listing.timestamp}</p>
        <p className='categoryListingName'>{listing.type}</p>
        <p className='categoryListingName'>{listing.urgent}</p>
      </div>
    </li>
  );
}

export default ListingItem;
