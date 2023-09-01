import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css'

function Navbar() {

    const navigate = useNavigate();
    //const location = useLocation();

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
                    <div className='nav-item' onClick={() => navigate('/Social')}>
                        <p><i class="fa-solid fa-earth-americas"></i> Social</p>
                    </div>
                    <div className='nav-item' onClick={() => navigate('/About')}>
                        <p><i class="fa-solid fa-circle-info"></i> About</p>
                    </div>
                    
                </div>
                <div className='nav-bottom'>
                    <div className='nav-item' onClick={() => navigate('/signIn')}>
                        <p><i className="fa-solid fa-right-to-bracket"></i> Sign In</p>
                    </div>
                    <div className='nav-item' onClick={() => navigate('/Profile')}>
                        <p><i className="fa-solid fa-user"></i> Profile</p>
                    </div>
                    
                    
                    
                </div>
            </div>
        </div>
    )
}

export default Navbar;