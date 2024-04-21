import React, { useState, useEffect } from 'react';

function StudentProfile() {
    const [studentEquipment, setStudentEquipment] = useState([]);

    useEffect(() => {
        fetchStudentEquipment();
    }, []);

    const fetchStudentEquipment = () => {
        // Fetch equipment for the logged-in student
        const studentId = localStorage.getItem('loggedInUser_id'); // Assuming the student ID is stored in localStorage
        fetch(`http://localhost:3001/studentEquipment/${studentId}`)
            .then(response => {
                if (!response.ok) {
                    console.error(`Error fetching student equipment: ${response.statusText}`);
                    throw new Error('Failed to fetch student equipment');
                }
                return response.json();
            })
            .then(data => {
                setStudentEquipment(data.data);
            })
            .catch(error => {
                console.error('Error fetching student equipment:', error);
                alert('Failed to fetch student equipment');
            });
    };

    function handleReturnItem(equipmentId) {
        // Make a POST request to return the item
        console.log(equipmentId)
        fetch('http://localhost:3001/returnequipment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ equipment_id: equipmentId })
        })
            .then(response => {
                if (response.ok) {
                    alert('Item returned successfully!');
                    fetchStudentEquipment(); // Refresh the student equipment list after returning the item
                } else {
                    console.error(`Failed to return item: ${response.statusText}`);
                    alert('Failed to return item');
                }
            })
            .catch(error => {
                console.error('Error returning item:', error);
                alert('Failed to return item');
            });
    };

    return (
        <div className="student-profile">
            <h2>My Equipment</h2>
            <ul>
                {studentEquipment?.map(equipment => (
                    <li key={equipment.equipment_id}>
                        <strong>Type:</strong> {equipment.equipment_type}, <strong>Specifications:</strong> {equipment.specifications}
                        <button onClick={() => handleReturnItem(equipment.equipment_id)}>
                            Return item
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default StudentProfile;
