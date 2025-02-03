const { createServer } = require("http");

const { Server } = require("socket.io");

const httpServer = createServer();

const io = new Server(


    httpServer,{


        cors: {

             origin: "http://localhost:5173"

        }

    }

)


let players = [];


io.on("connection",(clientConnection)=>{

    // console.log(`User connected: ${clientConnection.id}`);

    clientConnection.on("playerJoined",(playerData)=>{

        players.push({id:clientConnection.id, ...playerData});

        console.log(`Player joined: ${playerData.name} - Score: ${playerData.score}`);

        io.emit("updatePlayers",players)

    })
  

});



httpServer.listen(3000,()=>{

    console.log("🚀 Server is running on http://localhost:3000");

})