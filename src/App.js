import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Explore from './pages/explore';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/profile';
import SignUp from './pages/SignUp';
import SignIn from './pages/Signin';
import Navbar from './components/Navbar';
import Tickets from './pages/tickets';
import About from './pages/about';
import WorkTasks from './pages/WorkTasks';
import PrivateRoute from './components/PrivateRoute';
import CreateTicket from './pages/CreateTicket';
import Social from './pages/social';
import NewPost from './pages/newPost';
import MobileNavbar from './components/mobileNavbar';

function App() {
  const [isScreenSmall, setScreenSmall] = useState(window.innerWidth < 650);
  const [isNavOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setScreenSmall(window.innerWidth < 650);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function toggleNav() {
    setNavOpen((prevNavOpen) => !prevNavOpen);
  }

  function closeNav() {
    setNavOpen(false); // Set isNavOpen to false to close the mobile navbar
  }

  return (
    <>
      <Router>
        <header className="header">
          <div className="logo">
            <b>JP info</b>
          </div>
          {isScreenSmall && (<div className="open-nav" onClick={toggleNav}>
            <i className={`fa-solid ${isNavOpen ? "fa-xmark" : "fa-bars"}`}></i>
          </div>)}
        </header>
        <div className="content-wrapper">
          {isScreenSmall && (
            <div
              className="small-nav-wrapper"
              id="small-nav-wrapper"
              style={{ visibility: isNavOpen ? "visible" : "hidden"  }}
              // style={{ maxHeight: 'calc(100vh - 50px)', overflowY: 'auto' }}
            >
              {/* <p className='close' onClick={toggleNav}>X</p> */}
              <MobileNavbar onCloseNav={closeNav} />
            </div>
          )}

          {!isScreenSmall && (
            <div className="navbar" id="navbar">
              <Navbar />
            </div>
          )}

          <div className="content">
            <Routes>
              {/* home element */}
              <Route path="/" element={<Explore />} />

              {/* Support tickets */}
              <Route path="/tickets" element={<Tickets />} />
              <Route path="/CreateTicket" element={<CreateTicket />} />

              {/* work tasks */}
              <Route path="/workTasks" element={<WorkTasks />} />

              {/* Company social network */}
              <Route path="/newPost" element={<PrivateRoute />}>
                <Route path="/newPost" element={<NewPost />} />
              </Route>
              <Route path="/social" element={<PrivateRoute />}>
                <Route path="/social" element={<Social />} />
              </Route>
              {/* user login/register and profile review and updating */}
              <Route path="/signIn" element={<SignIn />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/profile" element={<PrivateRoute />}>
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route path="/about" element={<About/>} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
            </Routes>
          </div>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
