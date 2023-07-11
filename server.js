const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const glob = require("glob");
const connectToDatabase = require("./lib/db");
const app = express();
const checkToken = require("./middleware/checkToken");
app.use(express.json());
try {
    connectToDatabase();
} catch (error) {
    console.log(error);
    return;
}
app.use(cors());
app.use(morgan("dev"));
app.use(compression());

app.use(checkToken);
const routes = glob.sync(__dirname + "/router/*.js");
routes.forEach((item) => {
    require(item).default(app);
});
app.listen(3000, () => console.log("Server running on 3000"));
