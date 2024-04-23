import React, { useState, useEffect } from 'react';
import './Vote.css';

function Barn() {
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
            <h2>Voting Page</h2>
            <div className="caption-container">
                {/* Display picture */}
                <img src="url_to_your_image" alt="Game Image" />
                {/* Display captions in columns */}
                {captions.map((bean) => {
                    return (
                        <div className="caption-column">
                            <h3>Team {bean.team} Captions</h3>
                            {bean.captions.map((caption, index) => (
                                <>
                                    <p key={index}>{caption.caption}</p>
                                    <p>{caption.votes} stemmer</p>
                                    <button onClick={() => {
                                        fetch('http://localhost:5000/vote-caption', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({ caption: index, team: bean.team })
                                        })
                                    }}>
                                        Stem som beste
                                    </button>
                                </>
                            ))}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Barn;
