import './Navbar.css';
import { useNavigate } from 'react-router-dom';

function MobileNavbar({ onCloseNav }) {
  const navigate = useNavigate();

  function handleLinkClick() {
    onCloseNav(); // Call the onCloseNav function to close the mobile navbar
  }

  return (
    <div className="small-nav-wrapper">
      <div className="mobile-navbar-scrollable">
        <div className='nav-item' onClick={() => { navigate('/'); handleLinkClick(); }}>
          <p><i className="fa-sharp fa-solid fa-house"></i> Home</p>
        </div>
        <div className='nav-item' onClick={() => { navigate('/Tickets'); handleLinkClick(); }}>
          <p><i className="fa-solid fa-headset"></i> Tickets</p>
        </div>
        <div className='nav-item' onClick={() => { navigate('/WorkTasks'); handleLinkClick(); }}>
          <p><i className="fa-solid fa-square-check"></i> My Work Tasks</p>
        </div>
        <div className='nav-item' onClick={() => { navigate('/Profile'); handleLinkClick(); }}>
          <p><i className="fa-solid fa-envelope"></i> My Contacts</p>
        </div>
        <div className='nav-item' onClick={() => { navigate('/Profile'); handleLinkClick(); }}>
          <p><i className="fa-regular fa-calendar"></i> My Calendar</p>
        </div>
        <div className='nav-item' onClick={() => { navigate('/Social'); handleLinkClick(); }}>
          <p><i className="fa-solid fa-earth-americas"></i> Social</p>
        </div>
        <div className='nav-item' onClick={() => { navigate('/signIn'); handleLinkClick(); }}>
          <p><i className="fa-solid fa-right-to-bracket"></i> Sign In</p>
        </div>
        <div className='nav-item' onClick={() => { navigate('/Profile'); handleLinkClick(); }}>
          <p><i className="fa-solid fa-user"></i> Profile</p>
        </div>
        <div className='nav-item' onClick={() => { navigate('/Settings'); handleLinkClick(); }}>
          <p><i className="fa-solid fa-gear"></i> Settings</p>
        </div>
      </div>
    </div>
  );
}

export default MobileNavbar;
