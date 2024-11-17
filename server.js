const express = require('express');
const app = express();
const PORT = 3000;

const path = require('path');


app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const connect = require(path.join(__dirname, 'db.js'));
const connection = connect();


app.get('/futar/:id', (req, res) => {
  
    const sql = 'SELECT fazon, fnev FROM futar';
    
    connection.query(sql, (err, results) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Database error');
        return;
      }
  
      
      let content = '';
      results.forEach(futar => {
        content += `
          <tr>
            <td>${futar.fazon}</td> 
            <td>${futar.fnev}</td>
          </tr>`;
      });
  
     
      res.send(content);
    });
  


  });

  app.post('/futar', (req, res) => {
    const { fnev, fazon } = req.body;
    const sql = 'INSERT INTO futar (fazon, fnev) VALUES (?, ?)';
    
    connection.query(sql, [fazon, fnev], (err, result) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ message: 'Database error' });
            return;
        }
        res.json({ message: 'Futár sikeresen hozzaadva!' });
    });
});

  app.delete('/futar/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM futar WHERE fazon = ?';
    
    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ message: 'Database error' });
            return;
        }
       
        res.json({ message: 'Futár sikeresen torolve!' });
    });
});

app.put('/futar/:id', (req, res) => {
  const id = req.params.id;
  const { fnev } = req.body;
  const sql = 'UPDATE futar SET fnev = ? WHERE fazon = ?';
  
  connection.query(sql, [fnev, id], (err, result) => {
      if (err) {
          console.error(err.message);
          res.status(500).json({ message: 'Database error' });
          return;
      }
      
      res.json({ message: 'Futar adatai frissitve!' });
  });
});




app.listen(PORT, () => {
  console.log('Server fut, Port: ' + PORT);
});
