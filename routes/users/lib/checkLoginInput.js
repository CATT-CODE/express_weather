const {checkIsEmpty, checkIsEmail} = require("./validatorMethods.js");

function checkLoginInput(req, res, next) {
    let errorObj = {};
    const {email, password} = req.body;

    if(checkIsEmpty(email)) {
        errorObj.email = "Email can not be empty"
    }
    if (!checkIsEmail(email)) {
        errorObj.email = "It must be in email format!";
    }
    if(checkIsEmpty(password)) {
        errorObj.password = "Password can not be empty"
    }

    if (Object.keys(errorObj).length > 0) {
        res.render("login", {success: false, error: errorObj})
    } else {
        next();
    }
}

module.exports = {
    checkLoginInput
}