const Book = require("../model/book");
const index = async (req, res) => {
    // const books = await Book.aggregate([
    //     {
    //         $lookup: {
    //             from: "authors",
    //             localField: "authorId",
    //             foreignField: "_id",
    //             as: "author",
    //         },
    //     },
    //     {
    //         $unwind: {
    //             path: "$author",
    //             preserveNullAndEmptyArrays: true,
    //         },
    //     },
    // ]);
    const books = await Book.find({}).populate("authorId");
    res.status(200).json({
        error: false,
        message: "books lists",
        data: books,
    });
};

const store = async (req, res) => {
    const book = new Book(req.body);
    const saveBook = await book.save();
    res.status(200).json({
        error: false,
        message: "books created successfully",
        data: saveBook,
    });
};

const update = async (req, res) => {
    let _id = req.params.id;
    const updateBook = await Book.findOneAndUpdate({ _id }, req.body, {
        returnOriginal: false,
    });
    res.status(200).json({
        error: false,
        message: "books updated successfully",
        data: updateBook,
    });
};

const destroy = async (req, res) => {
    let _id = req.params.id;
    await Book.findOneAndUpdate(
        { _id },
        { status: 0 },
        {
            returnOriginal: false,
        }
    );
    res.status(200).json({
        error: false,
        message: "books deleted successfully",
    });
};

module.exports = { index, store, update, destroy };
