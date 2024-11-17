function connect() {
    const mysql = require('mysql2');
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'pizza'
    });
    connection.connect(function(err) {
        if (err) throw err;
        console.log('Sikeres csatlakozas.');
    });
    return connection;
}
module.exports = connect; 
