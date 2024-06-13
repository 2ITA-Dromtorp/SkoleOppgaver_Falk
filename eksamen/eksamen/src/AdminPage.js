import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function AdminPage() {


    useEffect(() => {
        fetchMembers();
    }, []);


    const [members, setMembers] = useState([]);
    const [newTournament, setNewTournament] = useState({ sport: '', date: '', location: '' });
    const [tournaments, setTournaments] = useState([]);
    const [message, setMessage] = useState('');
    const [newMember, setNewMember] = useState({ name: '', age: '', sport: '', contact: '' });
    const [loggedInUser, setLoggedInUser] = useState(null);


    const fetchMembers = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/members');
            setMembers(response.data);
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    };




    const handleTournamentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/tournaments', newTournament);
            setTournaments([...tournaments, response.data]);
            setNewTournament({ sport: '', date: '', location: '' });
            setMessage('Turneringen ble opprettet!');
        } catch (error) {
            console.error("Error creating tournament:", error);
            setMessage('Det oppsto en feil under opprettelsen av turneringen.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/members', newMember);
            setMembers([...members, response.data]);
            setNewMember({ name: '', age: '', sport: '', contact: '' });
            setMessage('Medlemmet ble registrert!');
        } catch (error) {
            console.error("Error registering member:", error);
            setMessage('Det oppsto en feil under registreringen.');
        }
    };

    const handleTournamentInputChange = (e) => {
        const { name, value } = e.target;
        setNewTournament({ ...newTournament, [name]: value });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMember({ ...newMember, [name]: value });
    };



    console.log(loggedInUser)
    return (
        <>
            <div className="forms">
                <div className="turnering-form">
                    <h1>Opprett ny turnering</h1>
                    <form onSubmit={handleTournamentSubmit}>
                        <select
                            name="sport"
                            value={newTournament.sport}
                            onChange={handleTournamentInputChange}
                            required
                        >
                            <option value="Fotball">Fotball</option>
                            <option value="Håndball">Håndball</option>
                            <option value="Volleyball">Volleyball</option>
                        </select>
                        <input
                            type="date"
                            name="date"
                            placeholder="Dato"
                            value={newTournament.date}
                            onChange={handleTournamentInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="location"
                            placeholder="Sted"
                            value={newTournament.location}
                            onChange={handleTournamentInputChange}
                            required
                        />
                        <button type="submit">Opprett turnering</button>
                    </form>
                </div>

                <div className="member-form">
                    <h1>Registrer nytt medlem</h1>
                    {message && (<p>{message}</p>)}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Navn"
                            value={newMember.name}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="number"
                            name="age"
                            placeholder="Alder"
                            value={newMember.age}
                            onChange={handleInputChange}
                            required
                        />
                        <select
                            name="sport"
                            value={newMember.sport}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="Fotball">Fotball</option>
                            <option value="Håndball">Håndball</option>
                            <option value="Volleyball">Volleyball</option>
                        </select>
                        <select
                            name="contact"
                            value={newMember.contact}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="Henning">Henning</option>
                            <option value="Carina">Carina</option>
                            <option value="Joakim">Joakim</option>
                        </select>
                        <button type="submit">Registrer</button>
                    </form>
                </div>

        </div >
            <div className="members">
                <h1>Medlemmer</h1>
                <ul>
                    {members.map(member => (
                        <li key={member.id}>
                            <strong>Name:</strong> {member.name}<br />
                            <strong>Age:</strong> {member.age}<br />
                            <strong>Sport:</strong> {member.sport}<br />
                            <strong>Contact:</strong> {member.contact}
                        </li>
                    ))}
                </ul>
            </div>
        </>

    );
}
