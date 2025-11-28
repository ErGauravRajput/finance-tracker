import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

console.log("Loaded DB config:", {
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_HOST: process.env.DB_HOST,
});

export const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST || "localhost",
  dialect: "postgres",
  logging: false
});

console.log("Using Sequelize config object syntax");

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL connected");
    await sequelize.sync();
    console.log("✅ Models synchronized");
  } catch (err) {
    console.error("❌ DB connection error:", err.message);
    process.exit(1);
  }
};
