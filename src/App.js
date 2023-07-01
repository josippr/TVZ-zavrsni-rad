
import './App.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

//toastify, library for displaying error msgs during failed sign in attempts
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Explore from './pages/explore';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/profile';
import SignUp from './pages/SignUp';
import SignIn from './pages/Signin';
import Navbar from './components/Navbar';
import Tickets from './pages/tickets';
import Settings from './pages/Settings';
import CurrentUser from './components/CurrentUser';
import WorkTasks from './pages/WorkTasks';
import PrivateRoute from './components/PrivateRoute';
import CreateTicket from './pages/CreateTicket';



function App() {

  

  return (
    <>
      <Router>
        <header className='header'>
          <div className='logo'>
            Logo Placeholder
          </div>
          <div className='small-navbar'>
            {/* <CurrentUser /> */}
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
              <Route path="/profile" element={<PrivateRoute />}>
                <Route path="/profile" element={<Profile />}></Route>
              </Route>
              <Route path="/signIn" element={<SignIn />}></Route>
              <Route path="/signUp" element={<SignUp />}></Route>
              <Route path="/workTasks" element={<WorkTasks/>}></Route>
              <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
              <Route path="/CreateTicket" element={<CreateTicket />}></Route>
            </Routes>
          </div>
          
        </div>
        
      </Router>
      <ToastContainer />
      
    </>
  );
}

export default App;
