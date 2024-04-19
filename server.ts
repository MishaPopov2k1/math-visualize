import express from "express";
import http from "http";
import { Server } from "socket.io";
import { initializeDatabase } from "./db/database.ts";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const db = await initializeDatabase();

const PORT = Bun.env.PORT

//* middleware function is used to serve static
//* assets such as HTML files, images, CSS stylesheets, and JavaScript files from the 'client' directory. 
app.use(express.static('client'))

app.get('/', (req, res) => {
  console.log('__dirname :>> ', __dirname);
  res.sendFile(__dirname + 'index.html')
})

io.on("connection", (socket) => {

  console.log("User connected", socket);
  console.dir(db);
})
//   socket.on("joinRoom", (data) => {
//     const { roomCode, symbol } = data;

//     const room = db.query("SELECT * FROM game_rooms WHERE code = ?", [roomCode]).get();
//     if (!room) {
//       // Room not found, create a new one
//       db.query("INSERT INTO game_rooms (code) VALUES (?)", [roomCode]).run();
//     }

//     // Add player to the room
//     db.query("INSERT INTO game_players (room_id, x, y, symbol) VALUES (?, 0, 0, ?)", [room.id, symbol]).run();

//     socket.join(room.id.toString());

//     // Emit the current state of the game to the user
//     const players = db.query("SELECT * FROM game_players WHERE room_id = ?", [room.id]).all();
//     const formulas = db.query("SELECT * FROM game_formulas WHERE room_id = ?", [room.id]).all();

//     socket.emit("gameState", { players, formulas });
//   });

//   socket.on("movePlayer", (data) => {
//     const { roomId, x, y } = data;

//     // Update player position
//     db.query("UPDATE game_players SET x = ?, y = ? WHERE room_id = ? AND id = ?", [x, y, roomId, socket.id]).run();

//     // Emit the updated game state to all users in the room
//     const players = db.query("SELECT * FROM game_players WHERE room_id = ?", [roomId]).all();
//     const formulas = db.query("SELECT * FROM game_formulas WHERE room_id = ?", [roomId]).all();

//     io.to(roomId.toString()).emit("gameState", { players, formulas });
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected");

//     // Remove player from the room
//     db.query("DELETE FROM game_players WHERE id = ?", [socket.id]).run();
//   });
// });

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
