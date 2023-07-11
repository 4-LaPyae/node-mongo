const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res
            .status(200)
            .json({ error: true, message: "Email already exists" });
    }
    const auth_token = jwt.sign({ email }, "12345", {
        expiresIn: "1h",
    });
    const hashPsw = bcrypt.hashSync(password, 10);
    const user = new User({
        username,
        email,
        password: hashPsw,
        authToken: auth_token,
    });
    const saveUser = await user.save();
    res.status(200).json({
        error: false,
        message: "user registerd successfully",
        data: saveUser,
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const auth_token = jwt.sign({ email }, "12345", {
        expiresIn: "1h",
    });
    const user = await User.findOne({ email });
    if (!user) {
        return res
            .status(200)
            .json({ error: true, message: "Incorrect email or password" });
    }
    if (user && bcrypt.compareSync(password, user.password)) {
        const updateTokenUser = await User.findOneAndUpdate(
            { _id: user.id },
            { authToken: auth_token },
            {
                returnOriginal: false,
            }
        );
        res.status(200).json({
            error: false,
            message: "User Login Successfully",
            data: updateTokenUser,
        });
    } else {
        res.status(200).json({
            error: true,
            message: "Incorrect Password!",
        });
    }
};
module.exports = { register, login };
