import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContexts';
import logo from '../../images/Logo.svg'
import './Header.css'

const Header = () => {
    const {user, logOut} = useContext(AuthContext);

    return (
        <div className="header">
            <div className='nav'>
                <Link to="/"><img src={logo} alt="Logo"></img></Link>
                <div className="menu">
                    <ul>
                        <li><Link to="/">Shop</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/orders">Orders</Link></li>
                        <li><Link to="/inventory">Inventory</Link></li>
                        <li>
                            {
                                user?.uid ?
                                <button className='logout-btn' onClick={logOut}>Log Out</button>
                                :
                                <div className=''>
                                    <Link to="/login">Login</Link>
                                    <Link className='log-sign' to="/signup">Sign Up</Link>
                                </div>
                            }
                        </li>

                    </ul>
                </div>
            </div>
        </div>

    );
};

export default Header;