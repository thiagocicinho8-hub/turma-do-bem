import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI && process.env.NODE_ENV !== "test") {
  console.warn(
    "[db] MONGODB_URI não configurada. Copie .env.example para .env.local e preencha a conexão do MongoDB Atlas."
  );
}

const globalForMongo = globalThis as unknown as { _mongoose?: typeof mongoose };

async function connect() {
  if (!MONGODB_URI) return null;

  if (globalForMongo._mongoose?.connection?.readyState === 1) {
    return globalForMongo._mongoose;
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
    globalForMongo._mongoose = conn;
    return conn;
  } catch (error) {
    console.error("[db] Falha ao conectar no MongoDB:", error);
    return null;
  }
}

export async function dbReady(): Promise<boolean> {
  const conn = await connect();
  return Boolean(conn && conn.connection?.readyState === 1);
}