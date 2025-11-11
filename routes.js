const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'instagram',
    password: '737973',
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    let q = "SELECT count(*) FROM tempuser";
    try {
        connection.query(q, (err, results) => {
            if (err) throw err;
            // console.log(results);
            let users = results[0]["count(*)"]
            res.render("users.ejs", { users });
        })
    } catch (err) {
        console.log(err);
        res.send("Somthing wrong");
    }
})

app.get("/users", (req, res) => {
    let q = "SELECT * FROM tempuser";
    try {
        connection.query(q, (err, results) => {
            if (err) throw err;
            let data = results;
            // console.log(data);
            res.render("allusers", { data });
        })
    } catch (err) {
        res.send("Something went wrong")
    }
})

app.get("/users/:id/edit", (req, res) => {
    let { id } = req.params;
    let q = `SELECT * FROM tempuser WHERE id = '${id}'`;
    try {
        connection.query(q, (err, results) => {
            if (err) throw err;
            // console.log(results);
            let data = results[0];
            res.render("edit", { data });
        })
    } catch (err) {
        console.log("Something went wrong")
    }
})

app.patch("/users/:id/edit", (req, res) => {
    let { id } = req.params;
    let { username: newUsername, password: formPassword } = req.body;
    let q = `SELECT * FROM tempuser WHERE id = '${id}'`;
    try {
        connection.query(q, (err, results) => {
            if (err) throw err;
            let data = results[0];
            if (data.password != formPassword) {
                res.send("WRONG password!");
            } else {
                let q2 = `UPDATE tempuser SET username = '${newUsername}' WHERE id = '${id}'`;
                connection.query(q2, (err, results) => {
                    if (err) throw err;
                    // console.log(results);
                    res.redirect("/users");
                })
            }

        })
    } catch (err) {
        console.log("Something wrong")
    }
})

app.get("/users/add", (req, res) => {
    res.render("add.ejs");
})

app.post("/users/add/new", (req, res) => {
    let { id, username, email, password } = req.body;
    // console.log(id, username, email, password);
    let q = `INSERT INTO tempuser(id,username,email,password) VALUES('${id}','${username}','${email}','${password}')`;
    try {
        connection.query(q, (err, results) => {
            if (err) throw err;
            // res.send("User Added ");
            res.redirect("/users");
        })
    } catch (err) {
        res.send("Somthing went wrong");
    }
})

app.get("/users/:id", (req, res) => {
    let { id } = req.params;
    res.render("delete.ejs", { id });
})

app.delete("/users/:id/delete", (req, res) => {
    let { id } = req.params;
    let { email, password } = req.body;
    let q = `SELECT * FROM tempuser WHERE id = '${id}'`;
    try {
        connection.query(q, (err, results) => {
            if (err) throw err;
            let data = results[0];
            if (data.email != email || data.password != password) {
                res.send("Wrong Email or Password");
            } else {
                let q2 = `DELETE FROM tempuser WHERE id='${id}'`;
                connection.query(q2, (err, results) => {
                    if (err) throw err;
                    res.redirect("/users");
                })
            }
        })
    } catch (err) {
        res.send("Somthing went wrong");
    }
})

app.listen(8080, () => {
    console.log("Server Start");
})
