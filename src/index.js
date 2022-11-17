import express from "express";
import { PrismaClient } from "@prisma/client";
//middleware
import logger from "./helpers/middleware/logger.js";
import errorHandler from "./helpers/middleware/errorHandler.js";
//controllers
import rooms from "./controllers/Room.controllres.js";
import customer from "./controllers/customer.controllers.js";
import admin from "./controllers/admin.controllers.js";

const app = express();
app.use(express.json());
const prisma = new PrismaClient();
app.listen(process.env.PORT, () => {
	console.log("Server is running on port 3000");
	console.log(`http://localhost:${process.env.PORT}`);
});

app.use(logger);
app.use(errorHandler);
//Router
app.use("/register", customer);
app.use("/rooms", rooms);
app.use("/admin", admin);
export { prisma };
//export default app;
