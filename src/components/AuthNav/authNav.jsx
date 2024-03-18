import { Link } from 'react-router-dom';
import './authnav.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const AuthNavbar = () => {
    return (

        <>
            <nav>
                <div className="logo">
                    <h2>Code Voice Hub</h2>
                </div>
                <div className="profile">
                    <h4 ><Link  to={'/profile'}><AccountCircleIcon style={{fontSize:"40px",color:'white'}}  /></Link></h4>
                </div>
            </nav>
        </>

    );
}

export default AuthNavbar;