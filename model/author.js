const mongoose = require("mongoose");
const { Schema } = mongoose;

const authorSchema = new Schema(
    {
        name: { type: String, required: true },
    },
    { timestamps: true, versionKey: false }
);

const AuthorModel = mongoose.model("author", authorSchema);
module.exports = AuthorModel;
