const express = require("express");

require("./config/database");
const session = require("express-session");

const catwaysRoutes = require("./routes/catways");
const reservationsRoutes = require("./routes/reservations");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

const app = express();

app.use(express.json());
app.use(session({
    secret: "port-russell-secret",
    resave: false,
    saveUninitialized: true
}));


// PAGE ACCUEIL
app.get("/", (req, res) => {

res.send(`
<h1>API Port Russell</h1>

<p>Gestion du port de plaisance Russell</p>

<h2>Connexion</h2>

<form method="POST" action="/login">

<input name="email" placeholder="Email"/>
<br><br>

<input name="password" type="password" placeholder="Mot de passe"/>
<br><br>

<button type="submit">Login</button>

</form>

<br>

<a href="/documentation">Voir la documentation API</a>

`);

});


// DASHBOARD
app.get("/dashboard", (req, res) => {

res.send(`

<h1>Dashboard Port Russell</h1>

<p>Administration du port</p>

<br>

<a href="/catways">Voir les catways</a>
<br><br>

<a href="/users">Voir les utilisateurs</a>
<br><br>

<a href="/documentation">Documentation API</a>
<br><br>

<a href="/logout">Déconnexion</a>

`);

});


// DOCUMENTATION
app.get("/documentation", (req, res) => {

res.send(`

<h1>Documentation API Port Russell</h1>

<h2>Catways</h2>

GET /catways <br>
GET /catways/:id <br>
POST /catways <br>
PUT /catways/:id <br>
DELETE /catways/:id <br>

<br>

<h2>Reservations</h2>

GET /catways/:id/reservations <br>
GET /catways/:id/reservations/:idReservation <br>
POST /catways/:id/reservations <br>
PUT /catways/:id/reservations/:idReservation <br>
DELETE /catways/:id/reservations/:idReservation <br>

<br>

<h2>Users</h2>

GET /users <br>
GET /users/:email <br>
POST /users <br>
PUT /users/:email <br>
DELETE /users/:email <br>

<br>

<h2>Authentification</h2>

POST /login <br>
GET /logout <br>

`);

});


// ROUTES API
app.use("/catways", catwaysRoutes);
app.use("/", reservationsRoutes);
app.use("/", usersRoutes);
app.use("/", authRoutes);


app.listen(3000, () => {
    console.log("Serveur lancé sur http://localhost:3000");
});