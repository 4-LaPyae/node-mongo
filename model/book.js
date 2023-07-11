const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = new Schema(
    {
        authorId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "author",
        },
        title: { type: String, required: true },
        releaseYear: { type: String, required: true },
        status: { type: Number, default: 1, required: true },
    },
    { timestamps: true, versionKey: false }
);

const Book = mongoose.model("book", bookSchema);
module.exports = Book;
