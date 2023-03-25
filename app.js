const express = require("express");
const app = express();

const cors = require("cors");
const { sequelize } = require("./models/index.js");
const { swaggerUi, specs } = require("./swagger/swagger");

const indexRouter = require("./routes/index");

const port = 3001;

app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", indexRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use((err, req, res, next) => {
  console.log(err);
  return res.status(err.status || 500).json({
    success: err.expect,
    errorMessage: err.message || "서버 에러가 발생했습니다.",
  });
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
