// TeacherDashboard.js
import React, { useState, useEffect } from 'react';

function TeacherDashboard() {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    fetchStudentsWithEquipment();
  }, []);

  const fetchStudentsWithEquipment = () => {
    fetch('/api/all')
      .then(response => response.json())
      .then(data => {
        setAllData(data);
      })
      .catch(error => {
        console.error('Error fetching students with equipment:', error);
      });
  };

  const handleReturnItem = (studentId, equipmentId) => {
    const updatedStudents = allData.Equipment_loans.filter(loan => loan.student_id !== `S${studentId}`);
    setAllData(updatedStudents);
    fetch('/api/returnequipment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ studentId: studentId, equipment_id: equipmentId })
    }).then(fetchStudentsWithEquipment); // Fetch students with equipment again after returning the item
  };
  
  return (
    <div className="teacher-dashboard">
      <h2>Students List</h2>
      <ul>
        {allData?.Students?.map(student => {
          const loans = allData.Equipment_loans.filter(loan => loan.student_id === `S${student.student_id}`);
          return (
            <li key={student.id}>
              <h3>{student.name}</h3>
              <ul>
                {loans.map(equipment => {
                  const equipmentData = allData.Equipment.find(item => item.equipment_id === equipment.equipment_id);
                  return (
                    <li key={equipmentData.equipment_id}>
                      <strong>Type:</strong> {equipmentData.equipment_type}, <strong>Specifications:</strong> {equipmentData.specifications}
                      <button onClick={() => handleReturnItem(student.id, equipmentData.equipment_id)}>
                        Return item
                      </button>
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ul>
      <h2>Teacher List</h2>
      <ul>
        {allData?.Teacher?.map(teacher => {
        const loans = allData.Equipment_loans.filter(loan => loan.student_id === `T${teacher.teacher_id}`);
          return (
            <li key={teacher.id}>
              <h3>{teacher.name}</h3>
              <ul>
                {loans.map(equipment => {
                  const equipmentData = allData.Equipment.find(item => item.equipment_id === equipment.equipment_id);
                  return (
                    <li key={equipmentData.equipment_id}>
                      <strong>Type:</strong> {equipmentData.equipment_type}, <strong>Specifications:</strong> {equipmentData.specifications}
                      <button onClick={() => handleReturnItem(teacher.id, equipmentData.equipment_id)}>
                        Return item
                      </button>
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default TeacherDashboard;
