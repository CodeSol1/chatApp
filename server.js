const express = require("express");

const app = express();

const http = require("http").createServer(app)

const port = process.env.PORT || 5000;

app.use(express.static(__dirname + "/public"))



app.get("/", (req, res) => {
    res.sendFile(__dirname +"/index.html")
})


// socket
const io = require("socket.io")(http);
  io.on("connection", (socket) => {
      console.log("Connected......");

      socket.on('message', (msg) =>{
          //console.log(msg)
          socket.broadcast.emit('message',msg)
      })
})



http.listen(port, () => {
    console.log(`server is running at port no ${port}`)
})