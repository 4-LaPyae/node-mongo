const jwt = require("jsonwebtoken");
const User = require("../model/user");
const checkToken = (req, res, next) => {
    console.log(req.path);
    const whileList = ["/api/user/login", "/api/user/register"];
    let check = whileList.includes(req.path);
    if (check) {
        next();
    } else {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            res.status(200).json({
                error: true,
                message: "no token",
            });
            return;
        }
        jwt.verify(token, "12345", async (err, decoded) => {
            if (err) {
                return res
                    .status(200)
                    .send({ error: true, message: "Unauthorized Token!" });
            }
            const exitUser = await User.findOne({ authToken: token });
            exitUser && next();
        });
    }
};
module.exports = checkToken;
