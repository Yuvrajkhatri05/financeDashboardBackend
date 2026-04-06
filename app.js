require("dotenv").config();
const express = require("express");
const app = express();
const Port = process.env.PORT || 8000;
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const recordRoutes = require("./routes/recordRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/", recordRoutes);
app.use("/", dashboardRoutes);

app.get('/', (req, res) => {
  res.send('Finance Dashboard Backend is running');
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose.connect(process.env.MONGO_URI);

app.listen(Port, () => console.log(`Server Started at PORT:${Port}`));