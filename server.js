const express=require('express');
const http=require('http');
const {Server}=require('socket.io');

const app=express();
const server=http.createServer(app);
const io=new Server(server,{cors:{origin:"*"}});

let players={};

io.on('connection',s=>{
players[s.id]={x:200,y:150};
s.on('update',d=>players[s.id]=d);
s.on('disconnect',()=>delete players[s.id]);
});

setInterval(()=>io.emit('players',players),50);

server.listen(3000);
