import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ loggedInUser }) {
    console.log(loggedInUser)
    return (
        <div className='nav'>
            <h1>Ball Idrettslag</h1>
            <div className='links'>
                {loggedInUser ? (
                    <>
                        <button className ="nav-button">
                            <Link to="/admin">Admin</Link>
                        </button>
                    </>
                ) : (
                    ""
                )}
            </div>
            {loggedInUser ? (
                <button className="logout-button" onClick={() => {
                    localStorage.removeItem('token');
                    window.location.reload();
                }}>
                    <Link to="/">Logout</Link>
                </button>
            ) : (
                <>
                <button className ="nav-button">
                            <Link to="/">Home</Link>
                        </button>
                <button className="login-button">
                    <Link to="/login">Login</Link>
                </button>
                </>
            )}
        </div>
    );
}
