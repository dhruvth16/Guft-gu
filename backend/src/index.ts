import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 })

interface User {
    socket: WebSocket,
    room: string
    name: string
}

let socketMap = new Map<WebSocket, User>()

// const allSockets: User[] = []

wss.on('connection', (socket) => {
    socket.on('message', (message) => {
        // here message comes in the form of string so we have to convert it into JSON
        const parsedData = JSON.parse(message as unknown as string)

        // either the user want to join the room or want to chat 
        if (parsedData.type === "join") {
            /* allSockets.push({
                    socket,
                    room: parsedData.payload.roomId
                }) */

            // push the user to the roomId
            const user: User = {
                socket: socket,
                room: parsedData.payload.room,
                name: parsedData.payload.name
            }
            socketMap.set(socket, user)
        }
        if (parsedData.type === "chat") {
            // const currentUser = allSockets.find(x => x.socket === socket)?.room
            const currentUser = socketMap.get(socket)
            if (!currentUser)
                return;

            // send the message to all the users in the room
            socketMap.forEach((s) => {
                if (currentUser.room === s.room)
                    s.socket.send(JSON.stringify({
                    message: parsedData.payload.message,
                    sender: currentUser.name
                }))
            })

            /* allSockets.forEach((s) => {
                if (currentUser === s.room)
                    s.socket.send(parsedData.payload.message)
            }) */
        }
    })
})

