const express = require("express");
const app = express();
const port = 3000;
const tweetsRouter = require("./routes/tweetsRouter");
var cors = require('cors');

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
  cors()
);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/tweets", tweetsRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return res.json;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
