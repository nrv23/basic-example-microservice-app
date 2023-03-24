const express = require("express");
const http = require("http");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 9002;
const posts = {};


app.use(cors());
app.use(express.json());

async function handleEvent(type, data) {

    if (type === "PostCreated") {
        const { id, title } = data;

        posts[id] = {
            id,
            title,
            comments: []
        };

    }

    if (type === "CommentCreated") {

        const { id, content, postId, status } = data;
        const post = posts[postId];

        post.comments.push({ id, content, status });
    }

    if (type === "CommentUpdated") {

        const { id, content, postId, status } = data;
        const post = posts[postId];
        const comments = post.comments;

        for await (const comment of comments) {

            if (comment.id === id) {
                comment.status = status;
                comment.content = content;
            }
        }
    }

}

app.get('/posts', (req, res) => {

    res.send(posts);
})

app.post('/events', async (req, res) => {

    const { type, data } = req.body;
    handleEvent(type, data);
    console.log({ posts });
    res.send({});
})


const server = http.createServer(app);

server.listen(PORT,async () => {

    console.log(`Servidor escuchando en puerto ${PORT}`);
    const { data } = await axios.get("http://event-bus-srv:9005/events");

    for (const event of data) {
        console.log("Procesando evento", event);
        handleEvent(event.type, event.data);
    }
})