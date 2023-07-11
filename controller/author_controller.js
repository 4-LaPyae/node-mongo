const { default: mongoose } = require("mongoose");
const AuthorModel = require("../model/author");
const index = async (req, res, next) => {};
const store = async (req, res, next) => {
    const author = new AuthorModel(req.body);
    const saveAuthor = await author.save();
    res.status(200).json({
        error: false,
        message: "Author created successfully",
        data: saveAuthor,
    });
};
module.exports = { store, index };
