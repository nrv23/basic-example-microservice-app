const express = require("express");
const http = require("http");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 9006;

app.use(express.json());

app.post("/events", async (req,res) => {

    try {

        const  { type,data } = req.body;

        if(type === "CommentCreated") { // dentro de este if se va a generar el proceso de filtrado de comentarios

            const status = data.content.includes('orange') ? 'rejected':'approved' // si incluye esta palabra entonces el comentario es bloqueado

            await axios.post('http://localhost:9005/events',{
                type: "CommentModerated",
                data: {
                   id: data.id,
                   postId: data.postId,
                   status,
                   content: data.content
                }
            })
        }

        res.send({});
        
    } catch (error) {
        console.log({error});
        return res.status(500).send("Hubo un error");
    }

})

const server = http.createServer(app);

server.listen(PORT,() => {

    console.log(`Servidor escuchando en puerto ${PORT}`);
});
