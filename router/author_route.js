const express = require("express");
const { store } = require("../controller/author_controller");
const router = express();
const basePath = "/authors";
router.route(`${basePath}`).post(store);
exports.default = (app) => {
    app.use(router);
};
