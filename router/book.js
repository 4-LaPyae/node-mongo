const express = require("express");
const { index, store, update, destroy } = require("../controller/book");
const router = express();
const basePath = "/books";
router.route(`${basePath}`).get(index).post(store);
router.route(`${basePath}/:id`).put(update).delete(destroy);

exports.default = (app) => {
    app.use(router);
};
