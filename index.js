// const express = require('express')
// const path = require('path')
// const PORT = process.env.PORT || 3000

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('index'))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))

const express = require('express');
const app = express()
const path = require('path')
const server = require('http').Server(app)
const { Server } = require('socket.io')
const io = new Server(server)
const PORT = process.env.PORT || 3000


app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => {
  res.render('index')
});

server.listen(PORT, () => console.log(`Listening on port ${ PORT }`))

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('play clicked', function(msg){
        io.emit('play clicked', msg);
    });
    socket.on('pause clicked', function(msg){
        io.emit('pause clicked', msg);
    });
});