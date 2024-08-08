let io;

module.exports = {
    init : httpServer => {
        io = require('socket.io')(httpServer , {
            cors: {
              origin: "https://mern-project-sage-psi.vercel.app",
            },
          })
        return io;
    },
    getIO : () =>  {
        if(!io){
            throw new Error('Socket.io not initialize')
        }
        return io;
    }
}
