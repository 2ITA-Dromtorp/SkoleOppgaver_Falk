import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'



export default function MainPage() {
    const [members, setMembers] = useState([]);
    const [tournaments, setTournaments] = useState([]);
    const [newMember, setNewMember] = useState({ name: '', age: '', sport: '', contact: '' });
    const [message, setMessage] = useState('');
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        fetchTournaments();
    }, []);

    const fetchTournaments = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/tournaments');
            setTournaments(response.data);
        } catch (error) {
            console.error("Error fetching tournaments:", error);
        }
    };







    return (

        <div className="main-page">
            <div className="main-page-header">
                <h1>BALL IL</h1>
                <h2>Ball Idrettslag’s kommende turneringer</h2>
                <button>
                    <Link to="/info">Mer om klubben</Link>
                </button>
            </div>
            {loggedInUser ? (
                <div className="main-page-items">



                    <button onClick={() => {
                        localStorage.removeItem('token');
                        window.location.reload();
                    }}>
                        <Link to="/">Logout</Link>
                    </button>
                </div>
            ) : (
                ""
            )}


            <h1>Kommende turneringer</h1>
            <ul className="tournaments-list">
                {tournaments.map(tournament => (
                    <li key={tournament.id}>
                        <strong>Sport:</strong> {tournament.sport}<br />
                        <strong>Date:</strong> {new Date(tournament.date).toLocaleDateString()}<br />
                        <strong>Location:</strong> {tournament.location}
                    </li>
                ))}
            </ul>


        </div>
    );
}
