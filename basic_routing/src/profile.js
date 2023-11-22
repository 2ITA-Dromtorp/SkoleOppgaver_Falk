import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import json from './profiles';
import image from './images/chen.jpg';

export default function Profile() {
    const { profile } = useParams();
    const navigate = useNavigate();

    // Use state to store the individual student's information
    const [studentInfo, setStudentInfo] = useState(null);

    useEffect(() => {
        // Find the student information based on the profile parameter
        const foundStudent = json.elever.find(student => student.navn === profile);

        // Update the state with the found student information
        setStudentInfo(foundStudent);
    }, [profile]);

    // If the student information is not found, show a loading message
    if (!studentInfo) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <div className="profile">
                <div className="profilecard">
                    <h1>{studentInfo.navn}</h1>
                    <img src={image} alt={studentInfo.navn} />  
                    <p>Klasse: {studentInfo.klasse}</p>
                    <p>E-mail: {studentInfo.email}</p>
                    <p>Tlf.: {studentInfo.tlf}</p>
                    <button onClick={() => navigate("/")}>Til hovedmeny</button>
                </div>
            </div>
        </>
    );
}
