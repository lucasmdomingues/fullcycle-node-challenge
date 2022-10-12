const express = require('express')
const mysql = require('mysql')

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const connection = mysql.createConnection(config)

const app = express()
const port = 3000

app.get('/', (req, res) => {
    let name = req.query.name
    if (!name) {
        name = 'Lucas'
    }

    connection.query({
        sql: `INSERT INTO people(name) VALUES(?);`,
        values: [name]
    }, function (error) {
        if (error) throw error;
        console.log("Name stored in database...")
    })

    connection.query('SELECT id,name FROM people;', function (error, results) {
        if (error) throw error;

        let html = '<h1>Full Cycle Rock!</h1>'

        html += "<ul>"
        for (const result of results) {
            html += `<li>#${result.id} - ${result.name}</li>`
        }
        html += "</ul>"

        res.send(html)
    });
})

app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})