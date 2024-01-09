// Insert.js
import React, { useState } from "react";
import axios from "axios";

export default function Insert() {
    const [newStudentData, setNewStudentData] = useState({
        ElevID: "",
        Fornavn: "",
        Etternavn: "",
        DatamaskinID: "",
        Hobby: "",
        Klasse: "",
        Kjonn: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStudentData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleInsert = () => {
        axios
            .post("http://localhost:3001/insert", newStudentData)
            .then(response => {
                // Optionally, handle success or update state in Select component
            })
            .catch(error => console.log(error));
    };

    return (
        <div>
            <h2>Insert New Student</h2>
            {/* Create form fields for each column */}
            <input type="text" name="ElevID" value={newStudentData.ElevID} onChange={handleInputChange} />
            {/* ... (repeat for other columns) */}
            <button onClick={handleInsert}>Insert Student</button>
        </div>
    );
}
