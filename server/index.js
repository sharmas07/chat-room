const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const {Server} = require('socket.io');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origins:["http://localhost:5173"],
        handlePreflightRequest: (req, res)=>{
            res.writeHead(200, {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":"GET,POST",
                "Access-Control-Allow-Headers": "my-custom-header",
                "Access-Control-Allow-Credentials":true
            });
            res.end();
        }
    }
});

io.on('connection', (socket)=>{
    console.log("a user connected");
    console.log(socket);
})



const startServer = async()=>{
    server.listen(8080, ()=>{
        console.log("server started");
    });
}
startServer();