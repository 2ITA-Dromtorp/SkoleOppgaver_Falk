// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, } from 'react-router-dom';
import './App.css';
import Login from './login';
import MainPage from './MainPage';
import Layout from './layout';
import Register from "./register";
import AdminPage from "./AdminPage";
import Info from "./info";

function App() {

    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch('http://localhost:3001/api/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setLoggedInUser(data.user);
                })
                .catch(err => console.error(err));
        }
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout loggedInUser={loggedInUser}/>}>
                    <Route index element={<MainPage />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="admin" element={<AdminPage />} />
                    <Route path="info" element={<Info />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
