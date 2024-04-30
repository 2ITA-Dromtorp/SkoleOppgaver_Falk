  //App.js
  import React, { useState, useEffect } from 'react';
  import { Routes, Route, Outlet, Link, useNavigate } from 'react-router-dom';
  import EquipmentList from './EquipmentList';
  import LoginForm from './LoginForm';
  import AddStudentForm from './AddStudentForm';
  import AddEquipment from './AddEquipment';
  import AddTeacherForm from './AddTeacherForm';
  import TeacherDashboard from './TeacherDashboard';
  import StudentProfile from './StudentProfile';
  import './App.css';

  function App() {
    const [loggedInUser_id, setLoggedInUser_id] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [equipment, setEquipment] = useState();
    const navigate = useNavigate();

    // Load user data from local storage when app loads
    useEffect(() => {

      const savedUser = window.localStorage.getItem('loggedInUser_id');
      if (savedUser) {
        setLoggedInUser_id(savedUser);
        setLoggedInUser(window.localStorage.getItem('loggedInUser'));
      }
    }, []);

    useEffect(() => {
      // Fetch equipment data from the server
      fetch('/api/all')
        .then(response => response.json())
        .then(data => setEquipment(data))
        .catch(error => console.error('Error fetching equipment:', error));
    }, []);

    const handleLoginSuccess = (id, user) => {
      setLoggedInUser_id(id);
      console.log(`Logged in as ${user} with id ${id}`);

      // Store username in local storage
      window.localStorage.setItem('loggedInUser_id', id);
      window.localStorage.setItem('loggedInUser', user);
      setLoggedInUser_id(id);
      setLoggedInUser(user);
      // Navigate back to the home page after successful login
      navigate('/');
    };

    const isTeacher = equipment ? equipment.Teacher.find(e => `T${e.teacher_id}` === loggedInUser_id) : false;
    const isStudent = equipment ? equipment.Students.find(e => `S${e.student_id}` === loggedInUser_id) : false;

console.log(isTeacher, isStudent, equipment, loggedInUser_id)

    return (
      <>
        <div className="App">
          <nav>
            <ul>
              <li><Link to="/">Equipment</Link></li>
              {!loggedInUser_id && <li><Link to="/login">Login</Link></li>}
              {loggedInUser_id && <li className="loggedInUser">Logged in as <br/> <span id="username">{loggedInUser}</span></li>}
              {isTeacher ? (
                <>
                  <li className ="teacherdashboard"><Link to="/teacherDashboard">Teacher Dashboard</Link></li>
                </>
              ) : undefined}
              {isStudent ? (
                <>
                  <li className ="studentprofile"><Link to="/studentprofile">{loggedInUser}'s profile</Link></li>
                </>
              ) : undefined}
              {loggedInUser_id && <button onClick={() => {
                setLoggedInUser(null);
                setLoggedInUser_id(null);
                window.localStorage.removeItem('loggedInUser');
                window.localStorage.removeItem('loggedInUser_id');
                navigate('/');
              }}>Logout</button>}
            </ul>
          </nav>
          <div>
            <Outlet />
          </div>
        </div>
        <Routes>
          <Route path="/" element={<EquipmentList />} />
          <Route path="login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
          <Route path="addStudent" element={<AddStudentForm />} />
          <Route path="addEquipment" element={<AddEquipment />} />
          <Route path="addTeacher" element={<AddTeacherForm />} />
          <Route path="teacherDashboard" element={<TeacherDashboard />} />
          <Route path="studentprofile" element={<StudentProfile />} />
        </Routes>
      </>
    );
  }

  export default App;
