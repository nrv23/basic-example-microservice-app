const express = require("express");
const http = require("http");
const app = express();
const axios = require("axios");
const PORT = process.env.PORT || 9005;
const events = [];

app.use(express.json());


app.post('/events', (req, res) => {

    try {

        // guardar el evento
        const event = req.body;
        console.log("evetno desde el event bus",event);
        
        events.push(event);

        axios.post('http://posts-clusterip-srv:9000/events', event);
        axios.post('http://comments-srv:9001/events', event);
        axios.post('http://query-srv:9002/events', event); // este va ser el servicio para los querys
        axios.post('http://moderation-srv:9006/events', event);

        return res.status(200).json({
            status: "OK"
        });

    } catch (error) {
        
        console.log({error});
        //return res.status(500).send("Hubo un error");
    }

});

app.get('/events', (req,res) => {

    return res.send(events);

})

const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
})