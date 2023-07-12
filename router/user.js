const express = require("express");
const { register, login } = require("../controller/user");
const router = express();
const basePath = "/user";
router.post(`${basePath}/register`, register);
router.post(`${basePath}/login`, login);

exports.default = (app) => {
    app.use("/api", router);
};
