
import './App.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Explore from './pages/explore';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import SignIn from './pages/Signin';
import Navbar from './components/Navbar';
import Tickets from './pages/tickets';
import Settings from './pages/Settings';
import currentUser from './components/CurrentUser';



function App() {

  

  return (
    <>
      <Router>
        <header className='header'>
          <div className='logo'>
            Logo Placeholder
          </div>
          <div className='small-navbar'>
            <currentUser />
          </div>
        </header>
        <div className='content-wrapper'>
          <div className='navbar'>
            <Navbar />
          </div>
          <div className="content">
            <Routes>
              <Route path="/" element={<Explore />}></Route>
              <Route path="/tickets" element={<Tickets />}></Route>
              <Route path="/settings" element={<Settings />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/signIn" element={<SignIn />}></Route>
              <Route path="/signUp" element={<SignUp />}></Route>
              <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
            </Routes>
          </div>
          
        </div>
        
      </Router>
      
    </>
  );
}

export default App;
