import express from "express";
import dotenv from "dotenv";
import teacherRouter from "./routes/teacherRoute";
// import userRouter from "./routes/userRoute";
import studentRouter from "./routes/studentRoute";
import { errorHandler } from "./middleware/errorHandler";
import connectDB from "./config/db";
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from "./swagger";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
connectDB();

// Routes
// app.use("/api/users", userRouter);
app.use("/api/teacher", teacherRouter);
app.use("/api/student", studentRouter);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
