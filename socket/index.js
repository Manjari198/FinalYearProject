const io=require("socket.io")(8900,{
    cors:{
        origin:"http://localhost:3000",
    },
});

let users=[];

const addUser=(userId,socketId)=>{
    console.log("Adding user")
    !users.some((user)=>user.userId===userId) &&
    users.push({userId,socketId});
    users.map(u=>{
        console.log("user="+JSON.stringify(u))
    })
}

const removeUser=(socketId)=>{
    console.log("Removing user")
    users.map(u=>{
        console.log("user="+JSON.stringify(u))
    })
    users=users.filter((user)=>user.socketId!==socketId)
}

const getUser=(userId)=>{
    console.log("Getting user")
    return users.find((user)=>user.userId===userId)
}

io.on("connection",(socket)=>{
    console.log("Some user has connected")
    socket.on("addUser",userId=>{
        addUser(userId,socket.id);
        io.emit("getUsers",users)
    });

    socket.on("sendMessage",({senderId,receiverId,text})=>{
        const user=getUser(receiverId)
        if(!user){
            sid=undefined
        }
        else{
            sid=user.socketId
        }
        io.to(sid).emit("getMessage",{
            senderId,
            text,
        });
    });

    socket.on("disconnect",()=>{
        console.log("some user has disconnected")
        removeUser(socket.id)
        io.emit("getUsers",users)
    });
});