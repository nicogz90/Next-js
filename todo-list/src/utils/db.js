import { connect, connection } from "mongoose";

const conn = { isConnected: false };

export async function dbConnect() {
  if (conn.isConnected) return;
  const db = await connect(process.env.DB_URL);
  conn.isConnected = db.connections[0].readyState;

  // console.log(db.connection.db.databaseName);

  connection.on("connnected", () => {
    console.log("DataBase is connected");
  });
  connection.on("error", (error) => {
    console.log("Error connecting to DataBase: " + error);
  });
}
