//EquipmentList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function EquipmentList() {
    const [equipment, setEquipment] = useState();

    useEffect(() => { 
        // Fetch equipment data from the server
        fetch('/api/all')
            .then(response => response.json())
            .then(data => setEquipment(data))
            .catch(error => console.error('Error fetching equipment:', error));
    }, []);

    const handleBorrow = (equipmentId) => {
        // Check if the item is already borrowed
        const foundLoan = equipment?.Equipment_loans.find((loan) => loan.equipment_id === equipmentId);
        
        if (foundLoan && foundLoan.loan_status === 'borrowed') {
            alert('Equipment already borrowed');
            return;
        }
    
        // Prepare data for borrowing equipment
        const borrowData = {
            student_id: localStorage.getItem('loggedInUser_id'), // Replace with actual student ID
            equipment_id: equipmentId,
            loan_status: 'borrowed' // Initial status when borrowed
        };
    
        // Make a POST request to borrow equipment
        fetch('/api/equipment_loans', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(borrowData)
        })
        .then(response => {
            if (response.ok) {
                // Update the equipment list after borrowing
                // You might want to refetch the equipment list here
                window.location.reload();
            } else {
                throw new Error('Failed to borrow equipment');
            }
        })
        .catch(error => {
            console.error('Error borrowing equipment:', error);
            alert('Failed to borrow equipment');
        });
    };



    const handleReturnItem = (equipmentId) => {
        fetch('/api/returnequipment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ equipment_id: equipmentId })
        })
        .then(response => {
          if (response.ok) {
            alert('Equipment returned successfully!');
            // You might want to refetch the equipment list here
          } else {
            throw new Error('Failed to return equipment');
          }
        })
        .catch(error => {
          console.error('Error returning equipment:', error);
          alert('Failed to return equipment');
        });
      };
      



    return (
        <div className="equipment">
            <h2>Equipment List</h2>
            <ul>
                {equipment?.Equipment.map(item => {
                    const foundLoan = equipment.Equipment_loans.find((a) => a && a.equipment_id === item.equipment_id);
                    const isLoaned = foundLoan && foundLoan.loan_status === 'borrowed';
                    return (
                        <li key={item.equipment_id} className={`item_list_item${isLoaned ? ' is_borrowed' : ''}`} onClick={() => {
                            if (isLoaned) {
                                alert('Equipment already borrowed');
                            } else {
                                handleBorrow(item.equipment_id);
                            }
                        }}>
                            <p>Type: {item.equipment_type}</p>
                            <p>Specifications: {item.specifications}</p>
                            <img src={item.imagelink} alt={item.equipment_type} />
                            {/* <button onClick={() => handleReturnItem(equipment.equipment_id)}>
                            Return item
                        </button> */}
                        </li>
                    );
                })}
            </ul>
            <Link to="/addEquipment">Add equipment</Link>
        </div>
    );
}

export default EquipmentList;
