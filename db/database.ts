import { Database } from "bun:sqlite";

const db = new Database(":memory:");

export async function initializeDatabase() {
  await db.query(`
    CREATE TABLE game_rooms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.query(`
    CREATE TABLE game_players (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      room_id INTEGER NOT NULL,
      x INTEGER NOT NULL,
      y INTEGER NOT NULL,
      symbol TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (room_id) REFERENCES game_rooms(id)
    );
  `);

  await db.query(`
    CREATE TABLE game_formulas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      room_id INTEGER NOT NULL,
      x INTEGER NOT NULL,
      y INTEGER NOT NULL,
      formula TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (room_id) REFERENCES game_rooms(id)
    );
  `);
  
  return db
}

