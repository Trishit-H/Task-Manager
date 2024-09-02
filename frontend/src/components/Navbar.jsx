import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {

    const { logout } = useLogout();

    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    }

    return (
        <header>
            <div className="container">
                <div className="logo">
                    <Link to='/'>
                        Task Master
                    </Link>
                </div>
                <nav className='navbar'>
                    {user &&
                        <div className="logout">
                            <span>Welcome, {user.username}</span>
                            <button onClick={handleClick}>Log out</button>
                        </div>
                    }
                    {
                        !user &&
                        <div className='login-signup'>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                    }
                </nav>
            </div>
        </header>
    )
}

export default Navbar;