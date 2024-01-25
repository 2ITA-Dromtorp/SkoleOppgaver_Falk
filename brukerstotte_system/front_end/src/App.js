import React, { useContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import { TicketsContext } from "./context"

import Layout from './'
import Submit from './sider/submit';
import Tickets from './sider/tickets';

const App = () => {
    const [tickets, setTickets] = useState([]);
    return (
        <TicketsContext.Provider value={[tickets, setTickets]}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Submit />} />
                        <Route path="/tickets" element={<Tickets />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </TicketsContext.Provider>
    )
};

export default App;


