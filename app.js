const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

const port = 8080;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'user',
    password : 'password',
    database : 'cool_data_base'
});

connection.connect();

app.get('/', (req,res)=>{
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Formulário ai</title>
      </head>
      <body>
        <h1>Fazer login</h1>
        <form method="post" action="/login">
          <label for="username">Nome de usuário:</label>
          <input type="text" id="username" name="username"><br>
          <label for="password">Senha:</label>
          <input type="password" id="password" name="password"><br>
          <button type="submit">Login</button>
        </form>
        <a href="/criarconta"><button type="button">Criar uma conta</button></a>
      </body>
    </html>
    `)
})

app.get('/criarconta', (req, res)=>{
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Criar conta</title>
      </head>
      <body>
        <h1>Criar conta</h1>
        <form method="post" action="/criarconta">
          <label for="username">Nome de usuário:</label>
          <input type="text" id="username" name="username"><br>
          <label for="password">Senha:</label>
          <input type="password" id="password" name="password"><br>
          <button type="submit">Cadastrar</button>
        </form>
      </body>
    </html>
    `)
})

app.post('/criarconta', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const sql = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`;

    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("record inserted");
    });

    res.redirect('/');
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

    connection.query(sql, function (err, result) {
        if (err) throw err;
        if(result.length > 0) {
          res.redirect('/superpagina');
        } else {
          res.send(`
            <script>
              alert("Credenciais inválidas. Tente novamente.");
              window.location.href = "/";
            </script>
          `);
        }
    });
});

app.get('/superpagina', (req, res)=>{
    res.send("algo escrito aqui");
})

app.listen(port, ()=>{
    console.log(`O servidor esta aberto e esta rodando em: http://localhost:${port}/`)
})