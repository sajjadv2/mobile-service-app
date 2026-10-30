require("dotenv").config();
require("./config/env");

const express = require("express");
const cors = require("cors");
const prisma = require("./prisma");
const errorHandler = require("./middlewares/errorHandler");

const customerRoutes = require("./routes/customers.routes");
const serviceRoute = require("./routes/services.routes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/customers", customerRoutes);
app.use("/api/services", serviceRoute);

app.get("/api/health", (req, res) => {
  res.json({
    success: "true",
    message: "Backend is running",
  });
});

app.get("/api/db-test/", async (req, res) => {
  try {
    const result = await prisma.$queryRaw`SELECT 1 AS result`;
    res.json({
      success: true,
      message: "اتصال به دیتابیس موفق بود",
      result,
    });
  } catch (error) {
    console.error("database connection error:", error);
    res.status(500).json({
      success: false,
      message: "اتصال به دیتابیس ناموفق بود",
    });
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
