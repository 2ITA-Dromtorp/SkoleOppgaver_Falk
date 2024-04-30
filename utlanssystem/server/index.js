// server.js
// require('../frontend/my-app/src/hash'); // Require hash.js script

const express = require('express');
const app = express();
const port = process.env.PORT || 80
var mysql = require('mysql2');
var cors = require('cors');

const { flakcrypt, flakcompare } = require('./hash.js');

for (let i = 0; i < 10; i++) {
  console.log("MongoDB".repeat(i + 1));
}

app.use(express.static("build"));
app.use(cors());
app.use(express.json()); // Add JSON body parsing middleware

console.log(flakcrypt("Skole23"));

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  database: 'dromtorp'
});

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});


app.get('/api/all', (request, response) => {
  connection.query('SELECT * FROM students', function (serror, sresults, sfields) {
    if (serror) throw serror;
    connection.query('SELECT * FROM equipment', function (eerror, eresults, efields) {
      if (eerror) throw eerror;
      connection.query('SELECT * FROM equipment_loans', function (elerror, elresults, elfields) {
        if (elerror) throw elerror;
        connection.query('SELECT * FROM teachers', function (terror, tresults, tfields) {
          if (terror) throw terror;
          response.send({ "Equipment": eresults, "Equipment_loans": elresults, "Students": sresults, "Teacher": tresults });
        });
      });
    });
  });
}); 

app.get("/updateequipment/:newspecification/:equipment_id", (request, response) => {
  let newspecification = request.params.newspecification;
  let equipment_id = request.params.equipment_id;
  let imagelink = request.params.imagelink;
  let sqlquery = 'UPDATE equipment SET specifications=?, imagelink=?, WHERE equipment_id=?';
  connection.query(sqlquery, [newspecification, equipment_id, imagelink], function (error, results, fields) {
    if (error) {
      console.error('Error updating equipment:', error);
      response.status(500).send("Failed to update equipment");
      return;
    }
    response.send('Equipment updated successfully!');
  });
});

app.post("/addstudent", (request, response) => {
  const { username, password, name, email, phone_number, class: student_class } = request.body;

  // Validate input data
  if (!username || !password || !name || !email || !phone_number || !student_class) {
    return response.status(400).json({ success: false, message: "All fields are required" });
  }

  const sqlQuery = 'INSERT INTO students (username, password, name, email, phone_number, class) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [username, flakcrypt(password), name, email, phone_number, student_class];

  connection.query(sqlQuery, values, function (error, results) {
    if (error) {
      console.error('Error adding student:', error);
      return response.status(500).json({ success: false, message: "Failed to add student" });
    }

    response.json({ success: true, message: 'Student added successfully!' });
  });
});


app.post("/addequipment", (request, response) => {
  const { equipment_type, specifications, imagelink } = request.body;

  if (!equipment_type || !specifications || !imagelink) {
    response.status(400).send("All fields are required");
    return;
  }

  const sqlquery = 'INSERT INTO equipment (equipment_type, specifications, imagelink) VALUES (?, ?, ?)';
  const values = [equipment_type, specifications, imagelink];

  connection.query(sqlquery, values, function (error, results, fields) {
    if (error) {
      console.error('Error adding equipment:', error);
      response.status(500).send("Failed to add equipment");
      return;
    }

    // connection.query('INSERT INTO equipment_loans (student_id, equipment_id, loan_date, return_date, approved_by_teacher_id, loan_status) VALUES (?, ?, ?, ?, ?, ?)', function (error, results, fields) {
    //   if (error) {
    //     console.error('Error adding equipment:', error);
    //     response.status(500).send("Failed to add equipment in equipment_loans");
    //     return;
    //   }
    //   response.send('equipment added successfully!');
    // });
  });
});

app.post("/api/equipment_loans", (request, response) => {
  const { student_id, equipment_id, loan_status } = request.body;

  if (!student_id || !equipment_id || !loan_status) {
    response.status(400).send("All fields are required");
    return;
  }

  const sqlquery = 'INSERT INTO equipment_loans (student_id, equipment_id, loan_status) VALUES (?, ?, ?)';
  const values = [student_id, equipment_id, loan_status];

  connection.query(sqlquery, values, function (error, results, fields) {
    if (error) {
      console.error('Error adding equipment:', error);
      response.status(500).send("Failed to add equipment");
      return;
    }

    response.send('equipment added successfully!');
  });
});

app.post("/returnequipment", (request, response) => {
  const { equipment_id } = request.body;

  if (!equipment_id) {
    console.log(equipment_id, request.body)
    return response.status(400).json({ success: false, message: "Equipment ID is required" });
  }

  const sqlQuery = 'DELETE FROM equipment_loans WHERE equipment_id = ?';
  const values = [equipment_id];

  connection.query(sqlQuery, values, function (error, results) {
    if (error) {
      console.error('Error returning equipment:', error);
      return response.status(500).json({ success: false, message: "Failed to return equipment" });
    }

    response.json({ success: true, message: 'Equipment returned successfully!' });
  });
});



app.post("/borrowequipment", (request, response) => {
  const { student_id, equipment_id, loan_date, return_date, approved_by_teacher_id, loan_status } = request.body;

  if (!student_id || !equipment_id || !loan_date || !return_date || !approved_by_teacher_id || !loan_status) {
    response.status(400).send("All fields are required");
    return;
  }

  const role = student_id.substring(0, 1);
  const id = student_id.substring(1);


  const sqlquery = 'INSERT INTO equipment_loans (student_id, equipment_id, loan_date, return_date, approved_by_teacher_id, loan_status) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [id, equipment_id, loan_date, return_date, approved_by_teacher_id, loan_status];

  connection.query(sqlquery, values, function (error, results, fields) {
    if (error) {
      console.error('Error borrowing equipment:', error);
      response.status(500).send("Failed to borrow equipment");
      return;
    }
    response.send('Equipment borrowed successfully!');
  });
});

app.get('/studentsWithEquipment', async (request, response) => {
  const query = `
    SELECT students.student_id, students.name AS student_name, equipment.equipment_id, equipment.equipment_type, equipment.specifications
    FROM students
    LEFT JOIN equipment_loans ON students.student_id = equipment_loans.student_id
    LEFT JOIN equipment ON equipment_loans.equipment_id = equipment.equipment_id
  `;

  connection.query(query, async (error, results, fields) => {
    if (error) {
      console.error('Error fetching students with equipment:', error);
      response.status(500).send("Failed to fetch students with equipment");
      return;
    }

    const studentsWithEquipment = {};

    function getEquipmentFromStudentId(studentId) {
      return new Promise((resolve) => {
        console.log(studentId)
        connection.query('SELECT equipment_id FROM equipment_loans WHERE student_id = ?', [`S${studentId}`], (error, results, fields) => {
          if (error) {
            console.error('Error fetching equipment for student:', error);
            resolve(null);
            return null;
          }

          let studentData = studentsWithEquipment[studentId];
          if (!studentData) {
            studentData = [];
            studentsWithEquipment[studentId] = studentData;
          }
          console.log(studentData)
          resolve(studentData);
        });
      });
    }

    for (const row of results) {
      const { student_id, student_name, equipment_id, equipment_type, specifications } = row;

      if (!studentsWithEquipment[student_id]) {
        studentsWithEquipment[student_id] = {
          id: student_id,
          name: student_name,
          equipment: await getEquipmentFromStudentId(student_id),
        };
      }

      if (equipment_id) {
        studentsWithEquipment[student_id].equipment.push({
          id: equipment_id,
          type: equipment_type,
          specifications: specifications,
        });
      }
    }


    const studentsList = Object.values(studentsWithEquipment);

    response.json(studentsList);
  });
});


app.get('/studentEquipment/:studentId', (request, response) => {
  const studentId = request.params.studentId;

  if (!studentId) {
    return response.status(400).json({ success: false, message: 'Student ID is required' });
  }

  const query = `
    SELECT equipment.equipment_id, equipment.equipment_type, equipment.specifications
    FROM equipment_loans
    JOIN equipment ON equipment_loans.equipment_id = equipment.equipment_id
    WHERE equipment_loans.student_id = ?
  `;
  connection.query(query, [studentId], (error, results) => {
    if (error) {
      console.error('Error fetching student equipment:', error);
      return response.status(500).json({ success: false, message: 'Failed to fetch student equipment' });
    }

    response.json({ success: true, data: results });
  });
});



app.post("/api/login", (request, response) => {
  const { username, password } = request.body;

  if (!username || !password) {
    response.status(400).send("All fields are required");
    return;
  }

  // Query the database for the user in both students and teachers tables
  const studentQuery = 'SELECT * FROM students WHERE username = ?';
  const teacherQuery = 'SELECT * FROM teachers WHERE username = ?';
  const values = [username];

  connection.query(studentQuery, values, function (studentError, studentResults, studentFields) {
    if (studentError) {
      console.error('Error logging in (student):', studentError);
      response.status(500).send("Failed to log in");
      return;
    }

    // If the user is found in the students table
    if (studentResults.length > 0 && flakcompare(studentResults[0].password, password)) {
      response.json({ success: true, userType: "student", message: "Login successful!", id: `S${studentResults[0].student_id}` });
      return;
    }

    // If not found in the students table, check the teachers table
    connection.query(teacherQuery, values, function (teacherError, teacherResults, teacherFields) {
      if (teacherError) {
        console.error('Error logging in (teacher):', teacherError);
        response.status(500).send("Failed to log in");
        return;
      }

      // If the user is found in the teachers table
      if (teacherResults.length > 0 && flakcompare(teacherResults[0].password, password)) {
        response.json({ success: true, userType: "teacher", message: "Login successful!", id: `T${teacherResults[0].teacher_id}` });
        return;
      }

      // If user is not found in both students and teachers tables
      response.status(401).json({ success: false, message: "Invalid username or password" });
    });
  });
});



app.post("/addteacher", (request, response) => {
  const { username, password, name } = request.body;

  if (!username || !password || !name) {
    response.status(400).send("All fields are required");
    return;
  }

  const sqlquery = 'INSERT INTO teachers (username, password, name) VALUES (?, ?, ?)';
  const values = [username, flakcrypt(password), name];

  connection.query(sqlquery, values, function (error, results, fields) {
    if (error) {
      console.error('Error adding teacher:', error);
      response.status(500).send("Failed to add teacher");
      return;
    }
    response.send('Teacher added successfully!');
  });
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
