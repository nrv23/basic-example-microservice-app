const express = require("express");
const http = require("http");
const cors = require("cors");
const axios = require("axios");
const { randomBytes } = require("crypto");
const app = express();
const PORT = process.env.PORT || 9001;
const commentsByPostId = {};

app.use(cors());
app.use(express.json());


app.get("/posts/:id/comments", async (req, res) => {
    const { id } = req.params;
    res.send(commentsByPostId[id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {

    try {
        const { content } = req.body;
    const { id } = req.params; // id del post
    const commentId = randomBytes(4).toString("hex");
    const comments = commentsByPostId[id] || []; // comentarios buscador por el id de post

    comments.push({ id: commentId, content, status: "pending" });
    commentsByPostId[id] = comments;

    await axios.post('http://localhost:9005/events', {
        type: "CommentCreated",
        data: {
            id: commentId,
            content,
            postId: id,
            status: "pending"
        }
    });

    res.status(201).send(commentsByPostId[id]);
    } catch (error) {
        console.log({error})
        res.status(500).send("Hubo un error");
    }
});

app.post('/events', async (req,res) => {
    
    const { type, data } = req.body;

    if(type === "CommentModerated") {

        // actualizar el estado del comentario

        const { postId, id, content, status } = data;
        const comments = commentsByPostId[postId];

        for await (const comment of comments) {

            if(comment.id === id) {
                comment.status = status;
            }
        }

        await axios.post("http://localhost:9005/events", {
            type: "CommentUpdated",
            data: {
                postId, id, content, status  
            }
        });
    }

    res.send({})
})


const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
})
