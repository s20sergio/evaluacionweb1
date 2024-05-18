import express from 'express'
import ListasController from "./controllers/listas.js";
import UserController from "./controllers/user.js";

const app = express()

app.use(express.json())
app.use(express.static('public'))

app.use("/api", ListasController);
app.use("/api", UserController);

app.get('/api', (req, res) => {
    res.type('text/plain')
    res.send('Hello World!')
})

export default app
