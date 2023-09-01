
import './profile.css';
import './SignIn.css';

function About() {

    return (
        <div className='profile'>
        <header className='profileHeader'>
            <div className='profile-title' style={{marginLeft: "-30px"}}>About</div>
        </header>

        <main className='main'>
            This web application is final college project. 
            It is built in React JS, with Google Firebase as cloud service.<br />
            Do not provide any personal data, especially credit card number or personal password(s)!<br/><br />
            <h3>Privacy policy</h3>
            All collected user data is safely stored in Google Firebase cloud service. Private user data
            is not available to anyone, including creator of the application, and users with admin access.<br/>
            All passwords are encrypted in accordance with Google safety rules.<br/><br/>
            <h3>Author</h3>
            <p>Copyright &copy; August 2023 | All rights reserved.</p>
            <p>By Josip Prpić, August 2023.</p>
            <p>Jprpic@tvz.hr</p>
        </main>
        </div>
    )
}

export default About;