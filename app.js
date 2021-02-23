const express = require("express");
const db = require("./db/models");
const cors = require("cors");
const app = express();
app.use(cors());
const path = require("path");
const passport = require("passport");

// Passport Setup
app.use(passport.initialize());
// Passport Strategies
const { localStrategy } = require("./middleware/passport");
// Passport Setup
app.use(passport.initialize());
passport.use(localStrategy);

app.use("/media", express.static(path.join(__dirname, "media")));
app.use(express.json());
const thingRoutes = require("./routes/thing");
app.use("/things", thingRoutes);
const userRoutes = require("./routes/users");
app.use(userRoutes);

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});

app.use((req, res, next) => {
  next({
    status: 404,
    message: "Path Not Found",
  });
});

app.use((err, req, res, next) => {
  res
    .status(err.status ? err.status : 500)
    .json({ message: err.message ? err.message : "Internal Server Error " });
});

// db.sequelize.sync();
db.sequelize.sync({ alter: true });
// db.sequelize.sync({ force: true });
//db.sequelize.authenticate();
