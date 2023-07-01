import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css'

function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="navbar">
            <div className='nav-ul'>
                <div className='nav-top'>
                    <div className='nav-item' onClick={() => navigate('/')}>
                        <p><i className="fa-sharp fa-solid fa-house"></i> Home</p>
                    </div>
                    <div className='nav-item' onClick={() => navigate('/Tickets')}> 
                        <p><i className="fa-solid fa-headset"></i> Support Tickets</p>
                    </div>
                    <div className='nav-item' onClick={() => navigate('/WorkTasks')}>
                        <p><i className="fa-solid fa-square-check"></i> My Work Tasks</p>
                    </div>
                    <div className='nav-item' onClick={() => navigate('/Profile')}>
                        <p><i class="fa-solid fa-envelope"></i> My Contacts</p>
                    </div>
                    <div className='nav-item' onClick={() => navigate('/Profile')}>
                        <p>Placeholder</p>
                    </div>
                </div>
                <div className='nav-bottom'>
                    <div className='nav-item' onClick={() => navigate('/signIn')}>
                        <p><i className="fa-solid fa-right-to-bracket"></i> Sign In</p>
                    </div>
                    <div className='nav-item' onClick={() => navigate('/Profile')}>
                        <p><i className="fa-solid fa-user"></i> Profile</p>
                    </div>
                    <div className='nav-item' onClick={() => navigate('/Settings')}>
                        <p><i className="fa-solid fa-gear"></i> Settings</p>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Navbar;