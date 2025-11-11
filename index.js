const { faker } = require('@faker-js/faker');
// Get the client
const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'instagram',
    password: '737973',
});

// let getUser = () => {
//     return [
//         faker.string.uuid(),
//         faker.internet.username(),
//         faker.internet.email(),
//         faker.internet.password(),
//     ];
// }

//=> For Singal User
// let q = "INSERT INTO tempuser(id,username,email,password) VALUES(?, ?, ?, ?)";
// let user1 = ["1", "5urajgupta", "suraj123@gmail.com", "123"];

//=> For Multipul users
// let q = "INSERT INTO tempuser(id,username,email,password) VALUES ?";
// let users = [["2", "chandan123", "chandan@gmail.com", "1234"], ["3", "naresh123", "naresh@gmail.com", "12345"]];

//=> Fake users by faker
// let users = [];
// for (let i = 1; i <= 90; i++) {
//     users.push(getUser());
//     // console.log(getUser())
// }

// let q = "INSERT INTO tempuser(id,username,email,password) VALUES ?";
// try {
//     connection.query(q, [users], (err, results) => {
//         if (err) throw err;
//         console.log(results);
//     }
//     );
// } catch (err) {
//     console.log(err)
// }


connection.end();
