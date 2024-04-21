// components/AdminPage.js
import React, { useState, useEffect } from 'react';
import './AdminPage.css';
import pig from "./img/bigblackoilypig.png"

function AdminPage() {
    const [captions, setCaptions] = useState([]);

    useEffect(() => {
        fetchCaptions();
    }, []);

    const fetchCaptions = async () => {
        try {
            const response = await fetch('http://localhost:5000/captions');
            if (response.ok) {
                const data = await response.json();
                setCaptions(data);
            } else {
                console.error('Failed to fetch captions');
            }
        } catch (error) {
            console.error('Error fetching captions:', error);
        }
    };

    return (
        <div>
            <h2>Admin Page</h2>
            <div className="caption-container">
                {/* Display picture */}
                <img src= {pig} alt="Game Image" />
                {/* Display captions in columns */}
                {captions.map((neger) => {
                    return (
                        <div className="caption-column">
                            <h3>Team {neger.team} Captions</h3>
                            {neger.captions.map((caption, index) => (
                                <p key={index}>{caption.caption}</p>
                            ))}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default AdminPage;
