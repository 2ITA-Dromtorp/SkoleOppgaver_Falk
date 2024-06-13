const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const upload = multer({ dest: 'uploads/' });

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'kantine',
  port: '3307'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});

app.get('/api/all-products', (req, res) => {
    db.query('SELECT * FROM Products', (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  });

// Get all available products
app.get('/api/products', (req, res) => {
  db.query('SELECT * FROM Products WHERE quantity > 0', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Place an order for a product
app.post('/api/order', (req, res) => {
  const { product_id } = req.body;
  db.query('UPDATE Products SET quantity = quantity - 1 WHERE product_id = ?', [product_id], (error) => {
    if (error) throw error;
    res.sendStatus(200);
  });
});

// Restock a product
app.post('/api/restock', (req, res) => {
  const { product_id } = req.body;
  db.query('UPDATE Products SET quantity = quantity + 1 WHERE product_id = ?', [product_id], (error) => {
    if (error) throw error;
    res.sendStatus(200);
  });
});

// Add a new product
app.post('/api/add-product', (req, res) => {
  const { product_name, description, price, quantity } = req.body;
  db.query(
    'INSERT INTO Products (product_name, description, price, quantity) VALUES (?, ?, ?, ?)',
    [product_name, description, price, quantity],
    (error, result) => {
      if (error) throw error;
      res.status(201).send(`Product added with ID: ${result.insertId}`);
    }
  );
});

// Update an existing product
app.put('/api/update-product/:id', (req, res) => {
  const { id } = req.params;
  const { product_name, description, price, quantity } = req.body;
  db.query(
    'UPDATE Products SET product_name = ?, description = ?, price = ?, quantity = ? WHERE product_id = ?',
    [product_name, description, price, quantity, id],
    (error, result) => {
      if (error) throw error;
      res.send(`Product modified with ID: ${id}`);
    }
  );
});

// Delete a product
app.delete('/api/delete-product/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Products WHERE product_id = ?', [id], (error, result) => {
    if (error) throw error;
    res.send(`Product deleted with ID: ${id}`);
  });
});

// Upload file
app.post('/api/upload-file', (req, res) => {
  const { filename } = req.body;
  db.query('UPDATE Products SET image = ? WHERE product_id = ?', [filename, 1], (error) => {
    if (error) throw error;
    res.sendStatus(200);
  });
});

// Update using JSON file
app.post('/api/update-from-json', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  const jsonFilePath = path.join(__dirname, req.file.path);

  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return res.status(500).send('Error reading JSON file');
    }

    let products;
    try {
      products = JSON.parse(data);
    } catch (parseError) {
      console.error('Error parsing JSON file:', parseError);
      return res.status(500).send('Error parsing JSON file');
    }

    // Delete out-of-stock items
    db.query('DELETE FROM Products WHERE quantity = 0', (deleteError, deleteResult) => {
      if (deleteError) {
        console.error('Error deleting out-of-stock items:', deleteError);
        return res.status(500).send('Error deleting out-of-stock items');
      }

      // Insert or update products from the JSON file
      products.forEach(product => {
        const { product_name, description, price, quantity } = product;
        db.query(
          'INSERT INTO Products (product_name, description, price, quantity) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE description = ?, price = ?, quantity = ?',
          [product_name, description, price, quantity, description, price, quantity],
          (error, result) => {
            if (error) {
              console.error('Database query error:', error);
              // Optionally handle this error more gracefully
            }
          }
        );
      });

      res.send('Database updated with JSON data');
    });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
