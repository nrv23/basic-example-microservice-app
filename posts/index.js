const express = require("express");
const http = require("http");
const cors = require("cors");
const axios = require("axios");
const { randomBytes } = require("crypto");
const app = express();
const PORT = process.env.PORT || 9000;

const posts = {};
app.use(cors());
app.use(express.json())

app.get("/posts", async (req, res) => {
    res.send(posts);
});


app.post("/posts", async (req, res) => {

    try {
        const id = randomBytes(4).toString("hex"); // crea un string randmon de caracteres en hexadecimal
        const { title } = req.body;
        posts[id] = {
            id,
            title
        }

        await axios.post('http://localhost:9005/events', {
            type: "PostCreated",
            data: {
                id,
                title
            }
        })

        return res.status(201).send(posts[id]); // enviar el post que se acaba de generar
    } catch (error) {
        console.log({error});
        return res.status(500).send("Hubo un error");
    }
});

app.post('/events', async (req,res) => {
    
    console.log({event: req.body})

    res.send({})
})


const server = http.createServer(app);


server.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
})
