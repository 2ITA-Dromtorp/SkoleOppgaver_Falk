# Table of Contents

1. [Explanation of Code](#introduction)
    1. [Backend](#paragraph1)
        1. [Dependencies](#subparagraph1)
        2. [Setting up Server and Database Connection](#subparagraph2)
        3. [Routes](#subparagraph3)
        4. [Error Handling](#subparagraph4)
        5. [Middleware](#subparagraph5)
        6. [Listening to Port](#subparagraph6)
    2. [Frontend](#paragraph2)
        1. [Components](#subparagraph7)
        2. [Test](#subparagraph8)
        3. [CSS](#subparagraph9)
        4. [Root](#subparagraph10)
        5. [Additional Notes](#subparagraph11)


# Explanation of Code

## Backend (index.js)

### Dependencies
```javascript
const express = require('express');
const app = express();
const port = 3001;
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
```
* Express: Handles HTTP requests.
* MySQL: Interface for MySQL database.
* Cors: Middleware for Cross-Origin Resource Sharing.
* Body-parser: Middleware for parsing incoming request bodies.

## Setting up Server and Database Connection

```javascript
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'lol',
  password: 'lol',
  database: 'dromtorp'
});
```
* Establishes a connection to the MySQL database.
## Routes
```javascript
app.get('/', (request, response) => {...});
app.get('/updateuser/:newhobby/:id', (request, response) => {...});
app.post('/updateuser', (request, response) => {...});
app.post('/insert', (request, response) => {...});
```
* GET /: Retrieves all records from the 'elev' table.
* GET /updateuser/:newhobby/:id: Updates user's hobby based on 'id'.
* POST /updateuser: Updates user's hobby and 'etternavn'.
* POST /insert: Inserts a new student record into the 'elev' table.

## Error handling

```javascript
process.on('unhandledRejection', (reason, promise) => {...});
```
* Handles unhandled rejections.
## Middleware

```javascript
app.use(bodyParser.json());
app.use(cors());
```
* Configures middleware for JSON parsing and CORS handling.

## Listening to port
```javascript
app.listen(port, () => {...});
```
* Starts the server listening on port 3001.

# Frontend

## Components
```javascript
// Insert.js
import React, { useState } from "react";
import axios from "axios";

const Insert = () => {...};

export default Insert;

// Navbar.js
import './App.css';
import Select from './select';
import Update from './update';
import Insert from './insert';
import Delete from './delete';
import { useState } from 'react';

const Navbar = () => {...};

export default Navbar;

// Select.js
import { useEffect, useState } from "react";
import axios from "axios";
import './table_style.css';

const Select = () => {...};

export default Select;

// Update.js
import React, { useState } from 'react';
import axios from 'axios';

const Update = () => {...};

export default Update;

// Delete.js
const Delete = () => {...};

export default Delete;
```

## Test

```javascript
// app.test.js
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {...});
```
* A basic test case to check if the React app renders successfully.

## CSS
```css
/* app.css */
.App {...}
.navbar {...}
.mainbox {...}
.content {...}
button {...}
```

* CSS styles for various componennts

```css
/* table_style.css */
.table-container {...}
.styled-table {...}
```
* CSS styles specific to table rendering.

## Root
```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

reportWebVitals();
```
* Entry point of the React application.

## Additional Notes
* The application uses React for frontend development and Express for the backend.
* Axios is employed for making HTTP requests between frontend and backend.
* CRUD operations (Create, Read, Update, Delete) are performed on student records stored in a MySQL database.

# Credits
* Falk von krogh
* [GitHub](https://github.com/Falconknot)
